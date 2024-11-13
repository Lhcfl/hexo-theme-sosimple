/**
 * Search Page Generator
 */
/** @param {import("hexo")} hexo */
module.exports = (hexo) => {
  hexo.extend.generator.register('searchpage', (locals) => ({
    path: 'search/',
    layout: ['search'],
  }));
};
