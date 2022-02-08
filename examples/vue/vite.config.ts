import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { foo } from 'vite-auto-import-resolvers'

export default defineConfig({
	plugins: [
		Vue(),
		AutoImports({
			imports: ['vue']
		})
	]
})
