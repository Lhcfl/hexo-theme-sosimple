/**
 * Tags list page generator
 */
/** @param {import("hexo")} hexo */
module.exports = (hexo) => {
  hexo.extend.generator.register('tags', (locals) => ({
    path: 'tags/',
    layout: ['tags'],
    data: Object.assign({}, locals, {
      __tags: true,
    }),
  }));
};
