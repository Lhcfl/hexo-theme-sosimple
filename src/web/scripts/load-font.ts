import { h } from '@/utils/jsx-runtime';

document.addEventListener('DOMContentLoaded', () => {
  document.head.appendChild(
    h(
      'style',
      null,
      `@font-face {
  font-family: 'mononoki';
  src: url('/fonts/mononoki-regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}`,
    ),
  );
});
