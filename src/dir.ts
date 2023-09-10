import path from "path";
import fg from "fast-glob";
import { kebabCase } from "scule";
import type { Plugin } from "vite";

import { showModule } from "./shared/base";
import { createEffects } from "./shared/effects";
import type { Resolver } from "unplugin-auto-import/types";

const { track, trigger, effects } = createEffects();

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

export const DirResolverHelper = (): Plugin => {
  return {
    enforce: "pre",
    name: "vite-auto-import-resolvers:dir-resolver-helper",
    configureServer({ watcher }) {
      watcher.add(Object.keys(effects));

      watcher.on("add", (path) => {
        trigger(path, "add");
      });

      watcher.on("unlink", (path) => {
        trigger(path, "unlink");
      });
    },
  };
};

const generateModules = (options: IGenModulesOptions) => {
  const { target, prefix, suffix, include, exclude } = options;

  const scanDirInInit = path.posix.resolve(target);

  const existedModulesInInit = fg
    .sync(`${scanDirInInit}/**/*`)
    .map(showModule);

  const modules = new Set<string>([
    ...include,
    ...existedModulesInInit,
  ]);

  track(
    path.resolve(target),
    (event: string, module: string) => {
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
};

export const dirResolver = (
  options?: Partial<Options>,
): Resolver => {
  let {
    target = "src/composables",
    suffix = "",
    prefix = "",
    include = [],
    exclude = [],
    normalize,
  } = options || {};

  const modules = generateModules({
    target,
    suffix,
    prefix,
    include,
    exclude,
  });

  if (typeof normalize !== "function") {
    normalize = ({ path }) => path;
  }

  return (name) => {
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
};
