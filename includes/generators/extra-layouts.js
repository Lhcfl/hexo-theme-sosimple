/** @param {import("hexo")} hexo */
module.exports = (hexo) => {
  hexo.extend.generator.register('searchpage', () => ({
    path: 'search/',
    layout: ['search'],
  }));

  hexo.extend.generator.register('tags', (locals) => ({
    path: 'tags/',
    layout: ['tags'],
    data: Object.assign({}, locals, {
      __tags: true,
    }),
  }));

  hexo.extend.generator.register('tags', (locals) => ({
    path: 'categories/',
    layout: ['categories'],
    data: Object.assign({}, locals, {
      __categories: true,
    }),
  }));
};
