import resolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import swc from 'unplugin-swc';

export default defineConfig([
  {
    input: 'src/hexo/index.ts',
    output: {
      name: 'main.js',
      file: 'scripts/index.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      swc.rollup({
        minify: false,
        jsc: {
          baseUrl: import.meta.dirname || '.',
          paths: {
            '@/*': ['./src/hexo/*'],
          },
        },
      }),
    ],
  },
]);
