import path from "path";
import fg from "fast-glob";
import { kebabCase } from "scule";

import { showModule } from "./utils";
import { createHooks } from "./hooks";

import type { Plugin } from "vite";
import type { Resolver } from "unplugin-auto-import/types";

const { track, trigger, keys } = createHooks();

interface IGenModulesOptions {
  target: string;
  prefix: string;
  suffix: string;
  include: string[];
  exclude: string[];
}

interface Normalize {
  (payload: { path: string; target: string; name: string }): string;
}

interface Options {
  /**
   * @default 'src/composables'
   */
  target: string;
  prefix: string;
  suffix: string;
  include: string[];
  exclude: string[];
  normalize: Normalize;
}

function generateModules(options: IGenModulesOptions) {
  const { target, prefix, suffix, include, exclude } = options;

  const scanDirInInit = path.posix.resolve(target);

  const existedModulesInInit = fg
    .sync(`${scanDirInInit}/**/*`)
    .map(showModule);

  const modules = new Set([
    ...include,
    ...existedModulesInInit,
  ]);

  track(
    path.resolve(target),
    // track module update logic
    function (event: string, module: string) {
      // add module
      if (event === "add") {
        const hasPrefix = module.startsWith(prefix);
        const hasSuffix = module.endsWith(suffix);

        const shouldAppend = hasPrefix &&
          hasSuffix &&
          !exclude.includes(module);

        if (shouldAppend) {
          modules.add(module);
        }
      }
      // remove module
      if (event === "unlink") {
        if (include.includes(module)) {
          return;
        }
        if (modules.has(module)) {
          modules.delete(module);
        }
      }
    },
  );
  return modules;
}

function defaultNormalize({ path }: Parameters<Normalize>[0]) {
  return path;
}

export function dirResolver(
  options?: Partial<Options>,
): Resolver {
  const {
    target = "src/composables",
    suffix = "",
    prefix = "",
    include = [],
    exclude = [],
    normalize = defaultNormalize,
  } = options || {};

  const modules = generateModules({
    target,
    suffix,
    prefix,
    include,
    exclude,
  });

  return function (name) {
    if (modules.has(name)) {
      return normalize!({
        name,
        target,
        path: path.posix.resolve(target, name),
      });
    }

    name = kebabCase(name);

    if (modules.has(name)) {
      return normalize!({
        name,
        target,
        path: path.posix.resolve(target, name),
      });
    }
  };
}

export function DirResolverHelper(): Plugin {
  return {
    enforce: "pre",
    name: "vite-auto-import-resolvers:dir-resolver-helper",
    configureServer({ watcher }) {
      watcher.add(keys());

      watcher.on("add", (path) => {
        trigger(path, "add");
      });

      watcher.on("unlink", (path) => {
        trigger(path, "unlink");
      });
    },
  };
}
