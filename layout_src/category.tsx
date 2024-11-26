import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { PostFull } from './components/post-full';
import { SharedLayout } from './shared';
import { i18n } from './lib/i18n';
import { PaginationPager } from './components/pagintion-pager';
import { PostList } from './components/post-list';

export default withHexoData((hexo) => {
  const tagTitle = (hexo.page as { category: string }).category;
  const title = `${i18n(hexo, 'Categories')} · ${tagTitle} · ${hexo.config.title}`;
  const description = title;

  return (
    <SharedLayout hexo={hexo} title={title} description={description} contentClass="category-page">
      <h1>
        {i18n(hexo, 'Categories')} · {tagTitle}
      </h1>
      <PostList hexo={hexo} item={hexo.page} />
      <PaginationPager hexo={hexo} item={hexo.page} />
    </SharedLayout>
  );
});
