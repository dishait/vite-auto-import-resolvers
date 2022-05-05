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
			dts: 'src/auto-imports.d.ts',
			imports: AutoGenerateImports(),
			resolvers: [
				dirResolver(),
				dirResolver({
					root: '..',
					target: 'shared'
				}),
				dirResolver({
					target: 'stores',
					suffix: 'Store'
				})
			]
		}),
		DirResolverHelper()
	]
})
