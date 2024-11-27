import { type Component, h } from '@/lib/jsx-runtime';
import { SharedLayout } from '@/templates/shared-layout';
import { i18n, type Translation } from '@/lib/i18n';
import { PaginationPager } from '@/components/pagintion-pager';
import { PostList } from '@/components/post-list';
import type { HexoLocale } from '@/lib/hexo-data';

export const TagCategoryLayout: Component<{
  hexo: HexoLocale;
  translateKey: keyof Translation;
  name: string;
}> = ({ hexo, translateKey, name }) => {
  const title = `${i18n(hexo, translateKey)} · ${name} · ${hexo.config.title}`;
  const description = title;

  return (
    <SharedLayout hexo={hexo} title={title} description={description} contentClass="tag-page">
      <h1>
        {i18n(hexo, translateKey)} · {name}
      </h1>
      <PostList hexo={hexo} item={hexo.page} />
      <PaginationPager hexo={hexo} item={hexo.page} />
    </SharedLayout>
  );
};
