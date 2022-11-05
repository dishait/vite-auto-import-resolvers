import { defineConfig } from 'tsup'

export default defineConfig({
	dts: true,
	clean: true,
	minify: true,
	splitting: true,
	outDir: 'dist',
	format: ['cjs', 'esm'],
	entry: ['src/index.ts'],
	noExternal: ['case', 'fast-glob'],
	esbuildOptions: (options, { format }) => {
		if (format === 'esm') {
			options.banner = {
				js: `import { createRequire } from 'module'; const require = createRequire(String(import.meta.url));`
			}
		}
	}
})
