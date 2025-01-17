import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { PostToc } from './post-toc';
import { PostMeta } from './post-meta';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { titleHTML } from '@/lib/page-custom';

export const PostFull: Component<{ hexo: HexoLocale; item: PostSchema | PageSchema }> = ({ hexo, item }) => {
  return (
    <article class="post-container post-full">
      <header class="post-title">
        <h1>{titleHTML(item)}</h1>
      </header>

      <PostToc hexo={hexo} item={item} />

      <section class="post-body">{item.content}</section>

      <PostMeta hexo={hexo} item={item} />
    </article>
  );
};
