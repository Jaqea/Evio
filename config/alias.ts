import { getRootPath, getSrcPath } from "./utils";

type AliasConfig = Record<string, string>;

export function createAliasConfig(): AliasConfig {
  return {
    "~": getRootPath(),
    "@": getSrcPath(),
  };
}
