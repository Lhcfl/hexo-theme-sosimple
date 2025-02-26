import type { HexoLocale } from '@/lib/hexo-data';
import { escapeHtml, h } from '@/lib/jsx-runtime';
import type { Component } from '@/lib/jsx-runtime';
import type { TagSchema } from 'hexo/dist/types';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { AsRecord, getThemeConfig } from '@/lib/types-trick';

export type SharedParam = {
  title?: string;
  description?: string;
  hexo: HexoLocale;
  contentClass?: string;
};

export const SharedLayout: Component<SharedParam> = (param, ...content) => {
  const hexo = param.hexo;
  const theme = getThemeConfig(hexo);
  param.title ??= hexo.config.title;
  param.description ??= theme.description || hexo.config.description;

  const keywords =
    AsRecord(hexo.page).keywords ||
    hexo.page.tags?.data?.map((t: TagSchema) => t.name)?.join(',') ||
    hexo.theme.keywords;

  const lazyLoadCSSs = [
    'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Noto+Serif+KR:wght@200..900&family=Noto+Serif+SC:wght@200..900&family=Noto+Serif+TC:wght@200..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap',
    'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
    hexo.url_for('css/font-awesome.min.css'),
  ];

  const lazyLoadCSSScript = lazyLoadCSSs.map((src) => `Utils.loadCSS("${src}");`).join('\n');

  return (
    <html lang={hexo.config.language}>
      <head>
        <meta charset="utf-8" />
        <meta name="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content={theme.author} />

        <title>{escapeHtml(param.title)}</title>

        <meta name="description" content={param.description} />
        <meta name="keywords" content={keywords} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta content="black" name="apple-mobile-web-app-status-bar-style" />
        <meta content="telephone=no" name="format-detection" />

        <meta id="site_data_static" data-url={hexo.url_for('/')} />

        <meta name="renderer" content="webkit" />
        <link rel="shortcut icon" type="image/x-icon" href={hexo.url_for(hexo.theme.favicon)} />

        <link rel="stylesheet" href={hexo.url_for('js_complied/bundle.css')} />
        <link rel="alternate" type="application/atom+xml" title="ATOM 1.0" href="/atom.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <script src={hexo.url_for('js_complied/bundle.js')} />
        <script>{lazyLoadCSSScript}</script>
      </head>
      <body class={param.contentClass}>
        <noscript>
          {lazyLoadCSSs.map((src) => (
            <link rel="stylesheet" href={src} />
          ))}
        </noscript>

        <Nav hexo={hexo} />

        <main class="main">{...content}</main>

        <Footer hexo={hexo} />
      </body>
    </html>
  );
};
