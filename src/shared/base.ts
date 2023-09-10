import { basename, extname } from "path";

export const showModule = (path: string) => {
  return basename(path, extname(path));
};
