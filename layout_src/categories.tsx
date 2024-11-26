import { withHexoData } from './lib/hexo-data';
import { escapeHtml, h } from './lib/jsx-runtime';
import { PostFull } from './components/post-full';
import { SharedLayout } from './shared';
import { i18n } from './lib/i18n';
import { PaginationPager } from './components/pagintion-pager';
import { PostList } from './components/post-list';
import type { CategorySchema } from 'hexo/dist/types';

export default withHexoData((hexo) => {
  const title = `${i18n(hexo, 'Categories')} · ${hexo.config.title}`;
  const description = title;

  let last_cat = '';

  const sorted_tags = (hexo.site.categories.data as CategorySchema[])
    .filter((x) => x.name)
    .sort((a, b) => (a.name! < b.name! ? -1 : 1));

  const in_cat = (name: string) => (/^[0-9]/.test(name) ? '0-9' : /^[a-zA-Z]/.test(name) ? name[0].toUpperCase() : '#');

  const compare_and_update_last_cat = (tag: CategorySchema) => {
    const ret = last_cat !== in_cat(tag.name!);
    last_cat = in_cat(tag.name!);
    return ret;
  };

  return (
    <SharedLayout hexo={hexo} title={title} description={description} contentClass="tags-page">
      <h1>{i18n(hexo, 'Categories')}</h1>
      {sorted_tags.map((tag) => (
        <template>
          {compare_and_update_last_cat(tag) ? <h3>{in_cat(tag.name!)}</h3> : null}
          <span>
            <a href={hexo.url_for(tag.path!)}>{escapeHtml(tag.name)}</a> × {tag.length}&nbsp;&nbsp;&nbsp;
          </span>
        </template>
      ))}
    </SharedLayout>
  );
});
