import type { CategorySchema, PageSchema, PostSchema, TagSchema } from 'hexo/dist/types';
import type { HexoLocale } from './hexo-data';
import type { ThemeConfig } from '@@/shared/define-config';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function AsRecord<T = Record<string, any>>(page: PageSchema | PostSchema) {
  return page as unknown as T;
}

export function getThemeConfig(hexo: HexoLocale) {
  return hexo.theme as ThemeConfig;
}

export function withTagsCategories(page: PageSchema | PostSchema) {
  return page as {
    tags?: { data?: CategorySchema[] };
    categories?: { data?: CategorySchema[] };
  };
}

export function withPrevNext(page: PageSchema | PostSchema) {
  return page as {
    prev?: PageSchema | PostSchema | number;
    next?: PageSchema | PostSchema | number;
    prev_link?: string;
    next_link?: string;
  };
}

export function isPostPage(page: ReturnType<typeof withPrevNext>): page is {
  prev?: PageSchema | PostSchema;
  next?: PageSchema | PostSchema;
} {
  return typeof page.prev_link === 'undefined' && typeof page.next_link === 'undefined';
}
