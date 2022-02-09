import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver } from 'vite-auto-import-resolvers'

export default defineConfig({
	plugins: [
		Vue(),
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
