import { withHexoData } from '@/lib/hexo-data';
import { h, escapeHtml, type Component } from '@/lib/jsx-runtime';
import type { HexoLocale } from '@/lib/hexo-data';
import { AsRecord, getThemeConfig, withTagsCategories } from '@/lib/types-trick';
import type { PageSchema, PostSchema } from 'hexo/dist/types';

export const IconSpan: Component<{ icon: string; hexo: HexoLocale }> = ({ icon, hexo }, ...content) => (
  <span class="info">
    {getThemeConfig(hexo).style.post_meta.show_icon ? <i class={`fa ${icon}`} /> : null}
    &nbsp;{...content}&nbsp;&nbsp;
  </span>
);
