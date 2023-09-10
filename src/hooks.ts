import { dirname } from "path";
import { showModule } from "./utils";

export interface Effect {
  (event: string, module: string): void;
}

export function createHooks() {
  const effects = new Map<string, Effect>();

  function keys() {
    return Array.from(effects.keys());
  }

  function track(dir: string, effect: Effect) {
    effects.set(dir, effect);
  }

  function trigger(path: string, event: string) {
    const target = dirname(path);
    const effect = effects.get(target);
    if (effect) {
      const module = showModule(path);
      effect(event, module);
    }
  }

  return {
    keys,
    track,
    trigger,
  };
}
