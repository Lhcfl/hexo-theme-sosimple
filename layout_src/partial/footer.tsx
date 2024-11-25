import { withHexoData } from '@/lib/hexo-data';
import { h, escapeHtml } from '@/lib/jsx-runtime';

export const Footer = withHexoData(({ theme }) => (
  <footer class="footer">
    <br />
    {theme.footer.html ? <p>{theme.footer.html}</p> : null}
    {theme.footer.text ? <p>{escapeHtml(theme.footer.text)}</p> : null}
    {theme.footer.enable_powered_by ? (
      <p class="powered_by">
        <span>
          Powered by <a href="https://hexo.io/">Hexo</a> and{' '}
          <a href="https://github.com/Lhcfl/hexo-theme-sosimple">SoSimple</a>
        </span>
      </p>
    ) : null}
  </footer>
));
