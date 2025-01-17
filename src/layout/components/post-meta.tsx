import { h, escapeHtml, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { AsRecord, getThemeConfig, withTagsCategories } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { IconSpan } from './icon-span';
import { PostToc } from './post-toc';

export const PostMeta: Component<{ hexo: HexoLocale; item: PageSchema | PostSchema }> = ({ hexo, item }) => (
  <section class="post-meta">
    <IconSpan hexo={hexo} icon="fa-calendar">
      <span class="date">{hexo.date(item.date, getThemeConfig(hexo).style.post_meta.date_format)}</span>
    </IconSpan>
    {withTagsCategories(item).categories?.data?.map((cat) => (
      <IconSpan hexo={hexo} icon="fa-folder-o">
        <a href={hexo.url_for(cat.path ?? '')} title={cat.name}>
          {escapeHtml(cat.name)}
        </a>
      </IconSpan>
    ))}
    {withTagsCategories(item).tags?.data?.map((tag) => (
      <IconSpan hexo={hexo} icon="fa-tag">
        <a href={hexo.url_for(tag.path ?? '')} title={tag.name}>
          {escapeHtml(tag.name)}
        </a>
      </IconSpan>
    ))}
  </section>
);
