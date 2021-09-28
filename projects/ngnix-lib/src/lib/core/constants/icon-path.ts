/** Fn that will include # in name if name contains .svg# */
export const DEFAULT_ICON_PATH: (val: string) => string = name => name.includes('.svg#') ? name : `#${name}`;
