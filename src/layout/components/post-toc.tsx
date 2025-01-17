import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { AsRecord, getThemeConfig } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { i18n } from '@/lib/i18n';

export const PostToc: Component<{ hexo: HexoLocale; item: PageSchema | PostSchema }> = ({ hexo, item }) => {
  if (AsRecord<{ toc?: boolean }>(item).toc && getThemeConfig(hexo).toc_max_depth > 0) {
    const tocHtml = hexo.toc(item.content || '', {
      class: 'toclist',
      list_number: false,
      max_depth: getThemeConfig(hexo).toc_max_depth,
    });
    return (
      <section class="post-toc">
        <details open>
          <summary>{i18n(hexo, 'TOC')}</summary>
          <div class="toc">{tocHtml}</div>
        </details>
      </section>
    );
  }
  return '';
};
