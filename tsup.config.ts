import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: {
    compilerOptions: {
      moduleResolution: "node"
    }
  }, // Generate declaration file (.d.ts)
  splitting: true,
  sourcemap: true,
  clean: true,
  bundle: true
});