import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { getThemeConfig } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { GitalkComment } from './comment/gitalk-comment';
import { i18n } from '@/lib/i18n';

export const Comment: Component<{ hexo: HexoLocale; item: PageSchema | PostSchema }> = ({ hexo, item }) => {
  let comment_body = '';
  if (item.comments === false) {
    return '';
  }
  if (getThemeConfig(hexo).comment?.enable === 'gitalk') {
    comment_body = <GitalkComment hexo={hexo} item={item} />;
  } else {
    return '';
  }
  return (
    <article class="comment-container">
      {/* <h3>{i18n(hexo, 'Comments')}</h3> */}
      {comment_body}
    </article>
  );
};
