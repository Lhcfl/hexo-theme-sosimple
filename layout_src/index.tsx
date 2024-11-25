import { withHexoData } from './lib/hexo-data';
import { h } from './lib/jsx-runtime';
import { Shared } from './shared';

export default withHexoData((ctx) => {
  // return ctx.config.title;
  return Shared({
    content: <p>Hello world</p>,
  })(ctx);
});
