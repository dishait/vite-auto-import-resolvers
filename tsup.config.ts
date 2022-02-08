import { defineConfig } from 'tsup'
import { dependencies } from './package.json'

export default defineConfig({
	dts: true,
	clean: true,
	minify: true,
	splitting: true,
	outDir: 'dist',
	format: ['cjs', 'esm'],
	entry: ['src/index.ts'],
	noExternal: Object.keys(dependencies)
})
