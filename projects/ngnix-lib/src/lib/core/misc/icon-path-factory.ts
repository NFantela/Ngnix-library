import { DEFAULT_ICON_PATH } from "ngnix-lib/src/lib/core/constants";

export function iconPathFactory(staticPath: string): (val: string) => string {
  // append / in the end
  const basePath = staticPath[staticPath.length - 1] === '/' ? staticPath : staticPath + '/';

  return name => {
    if (name.startsWith('ngnixIcon')) {
      return `${basePath}${name}.svg#${name}`;
    }

    return DEFAULT_ICON_PATH(name);
  };
}
