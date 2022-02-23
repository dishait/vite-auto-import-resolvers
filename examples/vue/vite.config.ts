import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import {
	dirResolver,
	DirResolverHelper,
	AutoGenerateImports
} from 'vite-auto-import-resolvers'

export default defineConfig({
	plugins: [
		Vue(),
		AutoImports({
			imports: AutoGenerateImports(),
			resolvers: [
				dirResolver(),
				dirResolver({
					target: 'stores',
					suffix: 'Store'
				})
			]
		}),
		DirResolverHelper()
	]
})
