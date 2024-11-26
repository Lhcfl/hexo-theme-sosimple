import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { PostFull } from './components/post-full';
import { SharedLayout } from './shared';

export default withHexoData((hexo) => {
  const description =
    hexo.page.description || hexo.strip_html(hexo.page.content).replace(/^\s*/, '').replace(/\s*$/, '').slice(0, 150);
  const title = `${hexo.page.title} · ${hexo.config.title}`;

  return (
    <SharedLayout hexo={hexo} title={title} description={description} contentClass="post-page page-page">
      <PostFull hexo={hexo} item={hexo.page} />
    </SharedLayout>
  );
});
