import { h } from './jsx-runtime';

export function loadCSS(url: string) {
  document.head.append(h('link', { rel: 'stylesheet', type: 'text/css', href: url }));
}
