import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImports from "unplugin-auto-import/vite";
import {
  AutoGenerateImports,
  dirResolver,
  DirResolverHelper,
} from "vite-auto-import-resolvers";

export default defineConfig({
  plugins: [
    Vue(),
    AutoImports({
      dts: "src/auto-imports.d.ts",
      imports: AutoGenerateImports(),
      resolvers: [
        dirResolver(),
        dirResolver({
          target: "shared",
        }),
        dirResolver({
          target: "src/stores",
          suffix: "Store",
        }),
      ],
    }),
    DirResolverHelper(),
  ],
});
