import { watch } from 'chokidar'
import { basename, extname } from 'path'
import type { Resolver } from 'unplugin-auto-import/dist/types'

interface IGenModulesOptions {
	path: string
	prefix: string
	suffix: string
	include: string[]
	exclude: string[]
}

const genModules = (options: IGenModulesOptions) => {
	const { path, prefix, suffix, include, exclude } = options

	const modules = new Set<string>(include)

	const watcher = watch(path, { depth: 1 })
	watcher.on('add', path => {
		const moduleName = basename(path, extname(path))

		const hasPrefix = moduleName.startsWith(prefix)
		const hasSuffix = moduleName.endsWith(suffix)

		const shouldAppend =
			hasPrefix &&
			hasSuffix &&
			!exclude.includes(moduleName)

		if (shouldAppend) {
			modules.add(moduleName)
		}
	})

	watcher.on('unlink', path => {
		const moduleName = basename(path, extname(path))
		if (include.includes(moduleName)) {
			return
		}
		if (modules.has(moduleName)) {
			modules.delete(moduleName)
		}
	})
	return modules
}

interface Options {
	srcAlias?: string
	target?: string
	prefix?: string
	suffix?: string
	include?: string[]
	exclude?: string[]
}

export const dirResolver = (
	options?: Options
): Resolver => {
	const {
		srcAlias = '~',
		target = 'composables',
		suffix = '',
		prefix = '',
		include = [],
		exclude = []
	} = options || {}

	const modules = genModules({
		path: `./src/${target}`,
		suffix,
		prefix,
		include,
		exclude
	})
	return name => {
		if (modules.has(name)) {
			return `${srcAlias}/${target}/${name}`
		}
	}
}
