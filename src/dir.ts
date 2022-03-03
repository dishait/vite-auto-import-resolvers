import { sync } from 'fast-glob'
import { Plugin, normalizePath } from 'vite'

import type { Resolver } from 'unplugin-auto-import/types'

import {
	basename,
	extname,
	dirname,
	default as path
} from 'path'

interface Effect {
	(event: string, module: string): void
}
interface Effects {
	[key: string]: Effect | undefined
}

interface IGenModulesOptions {
	target: string
	prefix: string
	suffix: string
	dirPath: string
	include: string[]
	exclude: string[]
}

interface Options {
	srcAlias: string
	target: string
	prefix: string
	suffix: string
	include: string[]
	exclude: string[]
}

let effects: Effects = Object.create(null)

const trigger = (path: string, event: string) => {
	const [_, targetFile] = normalizePath(path).split(/src\//)

	if (typeof targetFile === 'string') {
		const target = dirname(targetFile)
		const effect = effects[target]

		if (effect) {
			const module = showModule(path)
			effect(event, module)
		}
	}
}

const track = (target: string, effect: Effect) => {
	effects[target] = effect
}

export const DirResolverHelper = (): Plugin => {
	return {
		enforce: 'pre',
		name: 'vite-auto-import-resolvers:dir-resolver-helper',
		configureServer({ watcher }) {
			watcher.add(Object.keys(effects))

			watcher.on('add', path => {
				trigger(path, 'add')
			})

			watcher.on('unlink', path => {
				trigger(path, 'unlink')
			})
		}
	}
}

const showModule = (path: string) => {
	return basename(path, extname(path))
}

const generateModules = (options: IGenModulesOptions) => {
	const {
		target,
		dirPath,
		prefix,
		suffix,
		include,
		exclude
	} = options

	const existedModulesInInit = sync(`${dirPath}/**/*`).map(
		showModule
	)

	const modules = new Set<string>([
		...include,
		...existedModulesInInit
	])

	track(target, (event: string, module: string) => {
		// add module
		if (event === 'add') {
			const hasPrefix = module.startsWith(prefix)
			const hasSuffix = module.endsWith(suffix)

			const shouldAppend =
				hasPrefix && hasSuffix && !exclude.includes(module)

			if (shouldAppend) {
				modules.add(module)
			}
		}
		// remove module
		if (event === 'unlink') {
			if (include.includes(module)) {
				return
			}
			if (modules.has(module)) {
				modules.delete(module)
			}
		}
	})
	return modules
}

export const dirResolver = (
	options?: Partial<Options>
): Resolver => {
	const {
		srcAlias = '/src/',
		target = 'composables',
		suffix = '',
		prefix = '',
		include = [],
		exclude = []
	} = options || {}

	const modules = generateModules({
		target,
		suffix,
		prefix,
		include,
		exclude,
		dirPath: `./src/${target}`
	})

	return name => {
		if (modules.has(name)) {
			return path.posix.resolve(srcAlias, target, name)
		}
	}
}
