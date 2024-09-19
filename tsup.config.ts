import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // Build for commonJS and ESmodules
  dts: {
    compilerOptions: {
      moduleResolution: 'node',
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
    },
  }, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  bundle: true,
})
