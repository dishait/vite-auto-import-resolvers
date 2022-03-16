import path from 'path'
import { sync } from 'fast-glob'
import type { Plugin } from 'vite'

import { showModule } from './shared/base'
import { createEffects } from './shared/effects'
import type { Resolver } from 'unplugin-auto-import/types'

const { track, trigger, effects } = createEffects()

interface IGenModulesOptions {
	root: string
	target: string
	prefix: string
	suffix: string
	include: string[]
	exclude: string[]
}

interface Options {
	/**
	 * @default 'src'
	 */
	root: string
	/**
	 * 该配置已废弃
	 * The configuration is obsolete
	 */
	srcAlias: string
	/**
	 * @default 'composables'
	 */
	target: string
	prefix: string
	suffix: string
	include: string[]
	exclude: string[]
}

export const DirResolverHelper = (): Plugin => {
	return {
		enforce: 'pre',
		name: 'vite-auto-import-resolvers:dir-resolver-helper',
		configureServer({ watcher, ws, moduleGraph }) {
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

const generateModules = (options: IGenModulesOptions) => {
	const { root, target, prefix, suffix, include, exclude } =
		options

	const scanDirInInit = path.posix.resolve(root, target)
	const existedModulesInInit = sync(
		`${scanDirInInit}/**/*`
	).map(showModule)

	const modules = new Set<string>([
		...include,
		...existedModulesInInit
	])

	track(
		path.resolve(root, target),
		(event: string, module: string) => {
			// add module
			if (event === 'add') {
				const hasPrefix = module.startsWith(prefix)
				const hasSuffix = module.endsWith(suffix)

				const shouldAppend =
					hasPrefix &&
					hasSuffix &&
					!exclude.includes(module)

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
		}
	)
	return modules
}

export const dirResolver = (
	options?: Partial<Options>
): Resolver => {
	const {
		root = 'src',
		target = 'composables',
		suffix = '',
		prefix = '',
		include = [],
		exclude = []
	} = options || {}

	const modules = generateModules({
		root,
		target,
		suffix,
		prefix,
		include,
		exclude
	})

	return name => {
		if (modules.has(name)) {
			return path.posix.resolve(root, target, name)
		}
	}
}
