// vite.config.ts
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImports from "unplugin-auto-import/vite";
import {
  dirResolver,
  DirResolverHelper,
  AutoGenerateImports
} from "vite-auto-import-resolvers";
var vite_config_default = defineConfig({
  plugins: [
    Vue(),
    AutoImports({
      dts: "src/auto-imports.d.ts",
      imports: AutoGenerateImports(),
      resolvers: [
        dirResolver(),
        dirResolver({
          target: "shared"
        }),
        dirResolver({
          target: "src/stores",
          suffix: "Store"
        })
      ]
    }),
    DirResolverHelper()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydHMgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IHtcclxuXHRkaXJSZXNvbHZlcixcclxuXHREaXJSZXNvbHZlckhlbHBlcixcclxuXHRBdXRvR2VuZXJhdGVJbXBvcnRzXHJcbn0gZnJvbSAndml0ZS1hdXRvLWltcG9ydC1yZXNvbHZlcnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtcclxuXHRcdFZ1ZSgpLFxyXG5cdFx0QXV0b0ltcG9ydHMoe1xyXG5cdFx0XHRkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG5cdFx0XHRpbXBvcnRzOiBBdXRvR2VuZXJhdGVJbXBvcnRzKCksXHJcblx0XHRcdHJlc29sdmVyczogW1xyXG5cdFx0XHRcdGRpclJlc29sdmVyKCksXHJcblx0XHRcdFx0ZGlyUmVzb2x2ZXIoe1xyXG5cdFx0XHRcdFx0dGFyZ2V0OiAnc2hhcmVkJ1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdGRpclJlc29sdmVyKHtcclxuXHRcdFx0XHRcdHRhcmdldDogJ3NyYy9zdG9yZXMnLFxyXG5cdFx0XHRcdFx0c3VmZml4OiAnU3RvcmUnXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XVxyXG5cdFx0fSksXHJcblx0XHREaXJSZXNvbHZlckhlbHBlcigpXHJcblx0XVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDTTtBQUVQLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxNQUNYLEtBQUs7QUFBQSxNQUNMLFNBQVMsb0JBQW9CO0FBQUEsTUFDN0IsV0FBVztBQUFBLFFBQ1YsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFVBQ1gsUUFBUTtBQUFBLFFBQ1QsQ0FBQztBQUFBLFFBQ0QsWUFBWTtBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFFBQ1QsQ0FBQztBQUFBLE1BQ0Y7QUFBQSxJQUNELENBQUM7QUFBQSxJQUNELGtCQUFrQjtBQUFBLEVBQ25CO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
