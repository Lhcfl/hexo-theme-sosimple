import resolve from '@rollup/plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { defineConfig } from 'rollup';
import swc from 'unplugin-swc';

const layouts = ['index', 'post', 'page', 'archive', 'tag', 'tags', 'category', 'categories', 'search'].map(
  (layout) => ({
    input: `src/layout/${layout}.tsx`,
    output: {
      name: `${layout}.jsx`,
      file: `layout/${layout}.jsx`,
      format: 'cjs',
    },
    plugins: [
      resolve(),
      swc.rollup({
        minify: false,
        jsc: {
          // minify: {
          //   compress: false,
          // },
          baseUrl: import.meta.dirname || '.',
          paths: {
            '@/*': ['./src/layout/*'],
            '@@/*': ['./src/*'],
          },
          transform: {
            react: {
              pragma: 'h',
            },
          },
        },
      }),
    ],
  }),
);

export default defineConfig([
  // browser-friendly UMD build
  {
    input: 'src/web/main.ts',
    output: {
      name: 'main.js',
      file: 'source/js_complied/bundle.js',
      format: 'umd',
    },
    external: ['https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'],
    plugins: [
      resolve(), // so Rollup can find `ms`
      swc.rollup({
        minify: true,
        jsc: {
          baseUrl: import.meta.dirname || '.',
          paths: {
            '@/*': ['./src/web/*'],
          },
          transform: {
            react: {
              pragma: 'h',
            },
          },
        },
      }),
      sass({
        output: true,
      }),
    ],
  },
  ...layouts,
]);
