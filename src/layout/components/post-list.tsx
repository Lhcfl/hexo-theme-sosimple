import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { titleHTML } from '@/lib/page-custom';

export const PostList: Component<{ hexo: HexoLocale; item: PostSchema | PageSchema }> = ({ hexo, item }) => {
  const posts = (item as { posts: { data: PostSchema[] } }).posts.data;

  let lastYear = '';
  const content = posts.map((item) => {
    const itemYear = hexo.date(item.date, 'YYYY');
    const yearElem = itemYear !== lastYear ? <h2>{itemYear}</h2> : null;
    lastYear = itemYear;
    return (
      <template>
        {yearElem}
        <p class="post-list-item">
          <span class="date">{hexo.date(item.date, 'MM-DD ')}</span>
          <a href={hexo.url_for(item.path!)} title={item.title}>
            {titleHTML(item, hexo.date(item.date, 'YYYY-MM-DD'))}
          </a>
        </p>
      </template>
    );
  });

  return <div class="post-list">{content}</div>;
};
