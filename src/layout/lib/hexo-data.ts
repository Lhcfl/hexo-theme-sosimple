import type * as Hexo from 'hexo/dist/types';

export type HexoLocale = Hexo.LocalsType;

export function withHexoData(cb: (locale: HexoLocale) => string) {
  return cb;
}
