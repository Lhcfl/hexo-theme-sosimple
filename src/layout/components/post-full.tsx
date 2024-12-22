import { h, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { PostToc } from './post-toc';
import { PostMeta } from './post-meta';
import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { titleHTML } from '@/lib/page-custom';

export const PostFull: Component<{ hexo: HexoLocale; item: PostSchema | PageSchema }> = ({ hexo, item }) => {
  return (
    <div class="post-container post-full">
      <div class="post-title">
        <h1>{titleHTML(item)}</h1>
      </div>

      <PostToc hexo={hexo} item={item} />

      <div class="post-body">{item.content}</div>

      <PostMeta hexo={hexo} item={item} />
    </div>
  );
};
