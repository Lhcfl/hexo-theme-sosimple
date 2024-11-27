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

hexo.extend.generator.register('categories', (locals) => ({
  path: 'categories/',
  layout: ['categories'],
  data: Object.assign({}, locals, {
    __categories: true,
  }),
}));
