import { isPackageExists } from "local-pkg";
import type { PresetName } from "unplugin-auto-import/types";

interface Options {
  /**
   * @default ["ahooks","@vueuse/core","@vueuse/math","@vueuse/head","mobx","mobx-react-lite","preact","quasar","react","react-router","react-router-dom","react-i18next","svelte","svelte/animate","svelte/easing","svelte/motion","svelte/store","svelte/transition","vee-validate","vitepress","vue-router","vue-router/composables","vuex","uni-app","solid-js","@solidjs/router","solid-app-router","jotai","jotai/utils","recoil","@vue/composition-api","pinia","vue-demi","vue-i18n","vue-router-composables","vue","vue/macros","vitest"]
   */
  include: Array<PresetName>;
  /**
   * @default []
   */
  exclude: Array<PresetName>;
}

export const AutoGenerateImports = (
  options?: Partial<Options>,
): Array<PresetName> => {
  const {
    include = [
      "ahooks",
      "@vueuse/core",
      "@vueuse/math",
      "@vueuse/head",
      "mobx",
      "mobx-react-lite",
      "preact",
      "quasar",
      "react",
      "react-router",
      "react-router-dom",
      "react-i18next",
      "svelte",
      "svelte/animate",
      "svelte/easing",
      "svelte/motion",
      "svelte/store",
      "svelte/transition",
      "vee-validate",
      "vitepress",
      "vue-router",
      "vue-router/composables",
      "vuex",
      "uni-app",
      "solid-js",
      "@solidjs/router",
      "solid-app-router",
      "jotai",
      "jotai/utils",
      "recoil",
      "@vue/composition-api",
      "pinia",
      "vue-demi",
      "vue-i18n",
      "vue-router-composables",
      "vue",
      "vue/macros",
      "vitest",
    ],
    exclude = [],
  } = options || {};
  return include.filter((preset: any) => {
    if (exclude.includes(preset)) {
      return false;
    }
    return isPackageExists(preset);
  });
};

export const vue3Presets = [
  'vue',
  'vuex',
  'pinia',
  'vue-i18n',
  'vue-router',
  '@vueuse/core',
  '@vueuse/head',
  '@vueuse/math',
] as const