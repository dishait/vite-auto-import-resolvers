# vite-auto-import-resolvers

[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 的 `vite resolvers`，主要处理 `vite` 项目本身的 `api` 按需自动引入。

<br />


## README 🦉

简体中文 | [English](./README_EN.md)

<br />
<br />

## 动机 🐇

为了按需自动引入指定目录下模块的 `api`。

<br />
<br />

## 基本使用 🦖

1. 安装
```shell
npm i @types/node vite-auto-import-resolvers unplugin-auto-imports -D

# pnpm 👇
# pnpm i @types/node vite-auto-import-resolvers unplugin-auto-imports -D

# yarn 👇
# yarn add @types/node vite-auto-import-resolvers unplugin-auto-imports -D
```

2. 配置插件

```ts
// vite.config.js
// 或者 vite.config.ts

import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        // 该别名是必需 👇
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        AutoImports({
            dts: true,
            imports: ['vue'],
            resolvers: [
                dirResolver()
            ]
        })
    ]
})
```
3. 之后 `src/composables` 下模块的默认导出将在项目中自动按需引入

例如 👇

```ts
// src/composables/foo.ts

export default 100
```

```html
// src/App.vue
<script setup>
    console.log(foo) // 输出100，而且是按需自动引入的
</script>

<template>
    Hello World!!
</template>
```

4. 类型配置

如果你的项目是 `ts` 的，那么你应该始终在 `tsconfig.json` 中保持以下配置 👇

```json
{
    "compilerOptions": {
        // 其他配置
        "baseUrl": ".",
        "paths": {
            "~/*": ["src/*"]
        }
    },
    // 其他配置
}
```

<br />

## 进阶 🦕
### 强制前缀与后缀

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        // 该别名是必需 👇
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        AutoImports({
            dts: true,
            imports: ['vue'],
            resolvers: [
                dirResolver({ prefix: 'use' }), // 强制前缀为 use
                dirResolver({
                    target: 'stores', // 目标目录，默认为 composables
                    suffix: 'Store' // 强制后缀为 Store
                })
            ]
        })
    ]
})
```

于是

- `src/composables` 下只有 `use` 开头的模块会被按需加载
- `src/stores` 下只有 `Store` 结尾的模块会被按需加载

例如 👇

```ts
// src/stores/counterStore.ts
const counter = ref(100)

export default () => {
    const inc = (v: number = 1) => (counter.value += v)
    return {
        inc,
        counter
    }
}
```

```html
<script setup lang="ts">
    // 这将按需自动引入
    const n = counterStore()
</script>

<template>
    <div @click="n.inc()">{{n.counter}}</div>
</template>
```

<br />
<br />

### 其他风格路径别名

你可能在项目中用其他风格的路径别名，例如 `@`

那么你可以这样配置 👇

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        alias: {
            // 改变别名
           '@/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        AutoImports({
            dts: true,
            imports: ['vue'],
            resolvers: [
                dirResolver({ srcAlias: '@' }) // 设置别名，默认为 ~
            ]
        })
    ]
})
```

如果你是 `ts` 的项目，`tsconfig.json` 理所当然也应该改 👇

```json
{
    "compilerOptions": {
        // 其他配置
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    // 其他配置
}
```

<br />
<br />

### 包含与排除

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        alias: {
           '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        AutoImports({
            dts: true,
            imports: ['vue'],
            resolvers: [
                dirResolver({ 
                    prefix: 'use',
                    include: ['foo'], // 即使 foo 模块不是以 use 开头也会被包含进来
                    exclude: ['useBar'] // useBar 模块将始终被排除
                }) 
            ]
        })
    ]
})
```


<br />
<br />

## 启发 🐳

该 `resolvers` 来源于 `unplugin-auto-import` 的 `issue` 讨论 👉 [How should I auto import composition functions](https://github.com/antfu/unplugin-auto-import/issues/76)。


<br />
<br />

## 更多 🐃

更多项目工程实践可见 👉 [tov-template](https://github.com/dishait/tov-template)

<br />
<br />

## License 🐸

Made with markthree

Published under [MIT License](./LICENSE).

<br />