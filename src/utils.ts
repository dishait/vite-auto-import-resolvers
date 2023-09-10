import { basename, extname } from "path";

export function deleteArrayItem<T = unknown>(arr: T[], item: T) {
  const index = arr.findIndex((v) => v === item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

export function showModule(path: string) {
  return basename(path, extname(path));
}
