import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { SharedLayout } from './templates/shared-layout';
import { i18n } from './lib/i18n';
import { PaginationPager } from './components/pagintion-pager';
import { PostList } from './components/post-list';

export default withHexoData((hexo) => {
  const title = `${i18n(hexo, 'Archives')} · ${hexo.config.title}`;
  const description = title;

  return (
    <SharedLayout hexo={hexo} title={title} description={description} contentClass="archive-page">
      <h1>{i18n(hexo, 'Archives')}</h1>
      <PostList hexo={hexo} item={hexo.page} />
      <PaginationPager hexo={hexo} item={hexo.page} />
    </SharedLayout>
  );
});
