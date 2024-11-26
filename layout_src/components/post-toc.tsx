import { withHexoData } from '@/lib/hexo-data';
import { h, escapeHtml, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { AsRecord, getThemeConfig, withTagsCategories } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { IconSpan } from './icon-span';

export const PostToc: Component<{ hexo: HexoLocale; item: PageSchema | PostSchema }> = ({ hexo, item }) => {
  if (AsRecord<{ toc?: boolean }>(item).toc && getThemeConfig(hexo).toc_max_depth > 0) {
    const tocHtml = hexo.toc(item.content || '', {
      class: 'toclist',
      list_number: false,
      max_depth: getThemeConfig(hexo).toc_max_depth,
    });
    return (
      <div class="post-toc">
        <details open>
          <summary>{hexo.__?.('TOC')}</summary>
          <div class="toc">{tocHtml}</div>
        </details>
      </div>
    );
  }
  return '';
};
