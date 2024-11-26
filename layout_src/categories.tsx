import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { TagsCategoriesLayout } from './templates/tags-categories-layout';

export default withHexoData((hexo) => {
  return <TagsCategoriesLayout hexo={hexo} translateKey="Categories" dataSource="categories" />;
});
