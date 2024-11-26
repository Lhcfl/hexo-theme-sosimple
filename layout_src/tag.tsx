import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { AsRecord } from './lib/types-trick';
import { TagCategoryLayout } from './templates/tag-category-layout';

export default withHexoData((hexo) => {
  return <TagCategoryLayout hexo={hexo} name={AsRecord(hexo.page).tag} translateKey="Tags" />;
});
