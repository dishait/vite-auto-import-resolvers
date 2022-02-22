import { isPackageExists } from 'local-pkg'
import { PresetName } from 'unplugin-auto-import/dist/types'

interface Options {
	include: Array<PresetName>
	exclude: Array<PresetName>
}

export const AutoGenerateImports = (
	options?: Partial<Options>
) => {
	const {
		include = [
			'vue',
			'pinia',
			'vuex',
			'vitest',
			'vue-i18n',
			'vue-router',
			'@vueuse/core',
			'@vueuse/head'
		],
		exclude = []
	} = options || {}
	return include.filter(preset => {
		if (exclude.includes(preset)) {
			return false
		}
		return isPackageExists(preset)
	})
}
