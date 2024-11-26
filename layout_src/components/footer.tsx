import { h, escapeHtml, type Component } from '@/lib/jsx-runtime';
import { getThemeConfig } from '@/lib/types-trick';

export const Footer: Component = ({ hexo }) => {
  const theme = getThemeConfig(hexo);
  return (
    <footer class="footer">
      <br />
      {theme.footer.html ? <p>{theme.footer.html}</p> : null}
      {theme.footer.text ? <p>{escapeHtml(theme.footer.text)}</p> : null}
      {theme.footer.enable_powered_by ? (
        <p class="powered_by">
          Powered by <a href="https://hexo.io/">Hexo</a> and{' '}
          <a href="https://github.com/Lhcfl/hexo-theme-sosimple">SoSimple</a>
        </p>
      ) : null}
    </footer>
  );
};
