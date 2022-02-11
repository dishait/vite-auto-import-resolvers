# vite-auto-import-resolvers

The vite resolvers of [unplugin-auto-import]((https://github.com/antfu/unplugin-auto-import)) mainly deals with the `API` of the `vite` project itself, which is automatically imported on demand.


<br />


## README 🦉

[简体中文](./README.md) | English

<br />
<br />

## Motation 🐇

In order to automatically import the `API` of modules in the specified directory on demand.

<br />
<br />

## Basic Usage 🦖

1. install

```shell
npm i @types/node vite-auto-import-resolvers unplugin-auto-import -D

# pnpm 👇
# pnpm i @types/node vite-auto-import-resolvers unplugin-auto-import -D

# yarn 👇
# yarn add @types/node vite-auto-import-resolvers unplugin-auto-import -D
```

2. Configure plugins

```ts
// vite.config.js
// OR vite.config.ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        // This alias is required 👇
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        // This helper is required 👇
        DirResolverHelper(),
        AutoImports({
            imports: ['vue'],
            resolvers: [
                dirResolver()
            ]
        })
    ]
})
```
3. After that, the default export of modules under `src/composables` will be automatically imported as needed in the project

for example 👇

```ts
// src/composables/foo.ts

export default 100
```

```html
// src/App.vue
<script setup>
    console.log(foo) // log 100，And it is automatically introduced on demand
</script>

<template>
    Hello World!!
</template>
```

4. Type configuration

If your project is `ts`, your `tsconfig.json` should have the following configuration 👇

```json
{
    "compilerOptions": {
        // other configs
        "baseUrl": ".",
        "paths": {
            "~/*": ["src/*"]
        }
    },
    // other configs
}
```

<br />

## Advanced 🦕

### Mandatory prefix or mandatory suffix

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        DirResolverHelper(),
        AutoImports({
            imports: ['vue'],
            resolvers: [
                dirResolver({ prefix: 'use' }), // prefix use
                dirResolver({
                    target: 'stores', // Target directory, The default is composables
                    suffix: 'Store' // suffix Store
                })
            ]
        })
    ]
})
```

So

-  `src/composables`, only modules starting with `use` will be loaded on demand
- `src/stores`, only modules ending in `Store` will be loaded on demand

for example 👇

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
    // This is on demand
    const n = counterStore()
</script>

<template>
    <div @click="n.inc()">{{n.counter}}</div>
</template>
```

<br />
<br />

### include or exclude

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        DirResolverHelper(),
        AutoImports({
            imports: ['vue'],
            resolvers: [
                dirResolver({ 
                    prefix: 'use',
                    include: ['foo'], // foo modules are included even if they do not start with use
                    exclude: ['useBar'] // The useBar module will always be excluded
                }) 
            ]
        })
    ]
})
```

<br />
<br />

### Other style path aliases

You may use other styles of path aliases in your project，for example `@`

Then you can configure it like this 👇

```ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImports from 'unplugin-auto-import/vite'
import { dirResolver, DirResolverHelper } from 'vite-auto-import-resolvers'

export default defineConfig({
    resolve: {
        alias: {
            // Change alias
           '@/': `${resolve(__dirname, 'src')}/`
        }
    },
    plugins: [
        Vue(),
        DirResolverHelper(),
        AutoImports({
            imports: ['vue'],
            resolvers: [
                dirResolver({ srcAlias: '@' }) // Set alias, default to~
            ]
        })
    ]
})
```

If you are a project of `ts`, `tsconfig.json` should be changed 👇

```json
{
    "compilerOptions": {
        // other configs
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    // other configs
}
```

<br />
<br />

## Inspire 🐳

The `resolvers` comes from the `issue` discussion of `unplugin-auto-import` 👉 [How should I auto import composition functions](https://github.com/antfu/unplugin-auto-import/issues/76)。


<br />
<br />

## More 🐃

More project engineering practices，you can be see 👉 [tov-template](https://github.com/dishait/tov-template)

<br />
<br />

## License

Made with markthree

Published under [MIT License](./LICENSE).

<br />