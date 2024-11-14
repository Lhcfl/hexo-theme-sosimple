export { loadCSS } from './load-css';
export { h } from './jsx-runtime';

export function nextTick(fn: () => void) {
  setTimeout(() => {
    fn();
  }, 10);
}

export { escapeHTML } from './escape-html';
