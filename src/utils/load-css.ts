export function loadCSS(url: string) {
  const css = document.createElement('link');
  css.href = url;
  css.rel = 'stylesheet';
  css.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(css);
}
