import resolve from '@rollup/plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { defineConfig } from 'rollup';
import swc from 'unplugin-swc';

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
  {
    input: "layout_src/index.tsx",
    output: {
      name: "index.jsx",
      file: "layout/index.jsx",
      format: "cjs",
    },
    plugins: [
      resolve(),
      swc.rollup({
        jsc: {
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
  }
]);
