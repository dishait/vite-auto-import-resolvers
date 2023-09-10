import { dirname } from "path";
import { showModule } from "./base";

export interface Effect {
  (event: string, module: string): void;
}

export interface Effects {
  [key: string]: Effect | undefined;
}

export const createEffects = () => {
  let effects: Effects = Object.create(null);

  const trigger = (path: string, event: string) => {
    const target = dirname(path);
    const effect = effects[target];
    if (effect) {
      const module = showModule(path);
      effect(event, module);
    }
  };

  const track = (dirname: string, effect: Effect) => {
    effects[dirname] = effect;
  };

  return { effects, track, trigger };
};
