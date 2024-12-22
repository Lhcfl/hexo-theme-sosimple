import { h, escapeHtml, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { PostMeta } from './post-meta';
import { AsRecord, getThemeConfig } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { titleHTML } from '@/lib/page-custom';

export const PostExcerpt: Component<{ hexo: HexoLocale; item: PostSchema | PageSchema }> = ({ hexo, item }) => {
  const theme = getThemeConfig(hexo);
  const itemSummary = AsRecord<{ summary?: string }>(item).summary;
  const excerpt = theme.style.post_excerpt.summary_mode
    ? itemSummary || hexo.strip_html(item.excerpt || item.content).slice(0, 160)
    : item.excerpt || itemSummary || item.content;
  return (
    <div class="post-container post-excerpt">
      <div class="post-title">
        <h3>
          <a href={hexo.url_for(item.path!)}>{titleHTML(item, hexo.date(item.date, 'YYYY-MM-DD'))}</a>
        </h3>
      </div>
      <PostMeta hexo={hexo} item={item} />
      <div class="post-body">{excerpt}</div>
    </div>
  );
};
