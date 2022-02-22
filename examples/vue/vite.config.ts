import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import {
	dirResolver,
	DirResolverHelper,
	AutoGenerateImports
} from 'vite-auto-import-resolvers'

import Restart from 'vite-plugin-restart'

export default defineConfig({
	plugins: [
		Vue(),
		Restart({
			restart: ['../../dist/index.d.ts']
		}),
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
