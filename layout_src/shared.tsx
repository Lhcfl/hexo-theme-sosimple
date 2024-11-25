import { page } from 'hexo/dist/plugins/helper/is';
import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import type { TagSchema } from 'hexo/dist/types';
import { Footer } from './partial/footer';
import { Nav } from './partial/nav';

export type SharedParam = {
  title?: string;
  description?: string;
  content?: string;
};

export function Shared(param?: SharedParam) {
  return withHexoData((hexo) => {
    param ??= {};
    param.title ??= hexo.config.title;
    param.description ??= hexo.theme.description || hexo.config.description;
    param.content ??= '';

    const pageAny: Record<string, string> = hexo.page as never;

    const keywords =
      pageAny.keywords || hexo.page.tags?.data?.map((t: TagSchema) => t.name)?.join(',') || hexo.theme.keywords;

    const loadCSS = `
    Utils.loadCSS("https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Noto+Serif+KR:wght@200..900&family=Noto+Serif+SC:wght@200..900&family=Noto+Serif+TC:wght@200..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap");
    Utils.loadCSS("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css");
    Utils.loadCSS("${hexo.url_for('css/font-awesome.min.css')}");`;

    return (
      // biome-ignore lint/a11y/useHtmlLang: <explanation>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="X-UA-Compatible" content="IE=edge" />
          <meta name="author" content="Linca" />

          <title>{param.title}</title>

          <meta name="description" content={param.description} />
          <meta name="keywords" content={keywords} />

          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta content="black" name="apple-mobile-web-app-status-bar-style" />
          <meta content="telephone=no" name="format-detection" />

          <meta id="site_data_static" data-url={hexo.url_for('/')} />

          <meta name="renderer" content="webkit" />
          <link rel="shortcut icon" type="image/x-icon" href={hexo.url_for(hexo.theme.favicon)} />

          <link rel="stylesheet" href="/js_complied/bundle.css" />
          <link rel="alternate" type="application/atom+xml" title="ATOM 1.0" href="/atom.xml" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <script src="/js_complied/bundle.js" />
          <script>{loadCSS}</script>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&amp;family=Noto+Serif+KR:wght@200..900&amp;family=Noto+Serif+SC:wght@200..900&amp;family=Noto+Serif+TC:wght@200..900&amp;family=Noto+Serif:ital,wght@0,100..900;1,100..900&amp;display=swap"
            rel="stylesheet"
            type="text/css"
          />
          <link href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" rel="stylesheet" type="text/css" />
          <link href="/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
          <noscript>
            <link rel="stylesheet" href={hexo.url_for('css/font-awesome.min.css')} />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Noto+Serif+KR:wght@200..900&family=Noto+Serif+SC:wght@200..900&family=Noto+Serif+TC:wght@200..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
              integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
              crossorigin="anonymous"
            />
          </noscript>

          {Nav(hexo)}

          <div class="main">{param.content}</div>

          {Footer(hexo)}
        </body>
      </html>
    );
  });
}
