import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import {
	dirResolver,
	DirResolverHelper
} from 'vite-auto-import-resolvers'

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`
		}
	},
	plugins: [
		Vue(),
		DirResolverHelper(),
		AutoImports({
			imports: ['vue'],
			resolvers: [
				dirResolver(),
				dirResolver({
					target: 'stores',
					suffix: 'Store'
				})
			]
		})
	]
})
