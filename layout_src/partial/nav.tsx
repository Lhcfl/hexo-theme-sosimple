import { withHexoData } from '@/lib/hexo-data';
import { h, escapeHtml } from '@/lib/jsx-runtime';

export const Nav = withHexoData((hexo) => (
  <nav class="nav">
    {Object.entries(hexo.theme.menu)
      .map(([menu_name, link]) => <a href={hexo.url_for(link as string)}>{menu_name}</a>)
      .join('&nbsp;&nbsp;')}
  </nav>
));
