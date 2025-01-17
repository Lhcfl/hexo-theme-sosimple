import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { withHexoData } from './lib/hexo-data';
import { escapeHtml, h } from './lib/jsx-runtime';
import { SharedLayout } from './templates/shared-layout';
import { AsRecord, getThemeConfig } from './lib/types-trick';
import { PostExcerpt } from './components/post-excerpt';
import { PaginationPager } from './components/pagintion-pager';

export default withHexoData((hexo) => {
  const page_posts = AsRecord<{
    posts: { data: PostSchema[] };
  }>(hexo.page).posts.data;

  const theme = getThemeConfig(hexo);
  const index_page = (hexo.site?.pages?.data as PageSchema[] | undefined)?.find(
    (x: PageSchema) => x.source === 'index.md',
  );
  return (
    <SharedLayout hexo={hexo} contentClass="index-page">
      <header class="post-container index-post">
        <h1>{escapeHtml(hexo.config.title)}</h1>
        {theme.description ? (
          <div class="description">
            <p>{theme.description}</p>
          </div>
        ) : null}
        {index_page?.content && <div class="index-content">{index_page.content}</div>}
      </header>
      {page_posts
        .filter((item) => item.hidden !== true)
        .map((item) => (
          <PostExcerpt hexo={hexo} item={item} />
        ))}
      <PaginationPager hexo={hexo} item={hexo.page} />
    </SharedLayout>
  );
});
