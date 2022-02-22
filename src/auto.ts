import { isPackageExists } from 'local-pkg'
import { PresetName } from 'unplugin-auto-import/dist/types'

interface Options {
	/**
	 * @default ['vue', 'pinia', 'vuex','vitest','vue-i18n','vue-router','@vueuse/core','@vueuse/head','@nuxtjs/composition-api','preact','quasar','react','react-router','react-router-dom','svelte','svelte/animate','svelte/easing','svelte/motion','svelte/store','svelte/transition','vitepress','vee-validate']
	 */
	include: Array<PresetName>
	/**
	 * @default []
	 */
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
			'@vueuse/head',
			'@nuxtjs/composition-api',
			'preact',
			'quasar',
			'react',
			'react-router',
			'react-router-dom',
			'svelte',
			'svelte/animate',
			'svelte/easing',
			'svelte/motion',
			'svelte/store',
			'svelte/transition',
			'vitepress',
			'vee-validate'
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
