import resolve from '@rollup/plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { defineConfig } from 'rollup';
import swc from 'unplugin-swc';

const layouts = ["index", "post", "page"].map(layout => ({
  input: `layout_src/${layout}.tsx`,
  output: {
    name: `${layout}.jsx`,
    file: `layout/${layout}.jsx`,
    format: "cjs",
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
          '@/*': ['./layout_src/*'],
        },
        transform: {
          react: {
            pragma: "h"
          }
        }
      },
    }),
  ]
}))

export default defineConfig([
  // browser-friendly UMD build
  {
    input: 'src/main.ts',
    output: {
      name: 'main.js',
      file: 'source/js_complied/bundle.js',
      // format: 'umd',
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      swc.rollup({
        minify: true,
        jsc: {
          baseUrl: import.meta.dirname || '.',
          paths: {
            '@/*': ['./src/*'],
          },
        },
      }),
      sass({
        output: true,
      }),
    ],
  },
  ...layouts
]);
