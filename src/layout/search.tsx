import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { SharedLayout } from './templates/shared-layout';
import { i18n } from './lib/i18n';

export default withHexoData((hexo) => {
  const searchConfig = JSON.stringify({
    translation: {
      posts: i18n(hexo, 'insight.posts'),
      pages: i18n(hexo, 'insight.pages'),
      categories: i18n(hexo, 'insight.categories'),
      tags: i18n(hexo, 'insight.tags'),
      untitled: i18n(hexo, 'insight.untitled'),
    },
  });

  const title = `${i18n(hexo, 'Search')} · ${hexo.config.title}`;

  return (
    <SharedLayout hexo={hexo} title={title} description={title} contentClass="search-page">
      <h1>{i18n(hexo, 'Search')}</h1>
      <noscript>You must enable Javascript to use insight search.</noscript>
      <script>SoSimple.searchInit({searchConfig})</script>
      <div class="searchbox ins-search">
        <div class="searchbox-container">
          <input class="ins-search-input" type="text" placeholder={i18n(hexo, 'insight.hint')} />
          <div class="ins-section-wrapper">
            <div class="ins-section-container">Looding...</div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
});
