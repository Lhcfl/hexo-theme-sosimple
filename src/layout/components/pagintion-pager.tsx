import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { isPostPage, withPrevNext } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { i18n } from '@/lib/i18n';

export const PaginationPager: Component<{ hexo: HexoLocale; item: PostSchema | PageSchema }> = ({ hexo, item }) => {
  const pager = withPrevNext(item);
  const [prev, next] = isPostPage(pager)
    ? [
        {
          item: pager.prev,
          link: pager.prev?.path || '',
          title: pager.prev?.title,
          translation: i18n(hexo, 'prev_post'),
        },
        {
          item: pager.next,
          link: pager.next?.path || '',
          title: pager.next?.title,
          translation: i18n(hexo, 'next_post'),
        },
      ]
    : [
        {
          item: pager.prev,
          link: pager.prev_link || '',
          title: null,
          translation: i18n(hexo, 'prev'),
        },
        {
          item: pager.next,
          link: pager.next_link || '',
          title: null,
          translation: i18n(hexo, 'next'),
        },
      ];

  return (
    <p class="pagination">
      {prev.item ? (
        <a href={hexo.url_for(prev.link)} title={prev.title}>
          {prev.translation}
        </a>
      ) : null}
      {prev.item && next.item ? <span>&nbsp;&nbsp;</span> : null}
      {next.item ? (
        <a href={hexo.url_for(next.link)} title={next.title}>
          {next.translation}
        </a>
      ) : null}
    </p>
  );
};
