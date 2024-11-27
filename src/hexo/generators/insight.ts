import util from 'hexo-util';
import type { CategorySchema, PostSchema } from 'hexo/dist/types';

hexo.extend.generator.register('insight', (locals) => {
  function minify(str: string) {
    return util
      .stripHTML(str)
      .trim()
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/&#x([\da-fA-F]+);/g, (match, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
      .replace(/&#([\d]+);/g, (match, dec) => String.fromCharCode(dec));
  }
  function postMapper(post: PostSchema) {
    return {
      title: post.title,
      text: minify(post.content || ''),
      link: post.path || '',
    };
  }
  function tagMapper(tag: CategorySchema) {
    return {
      name: tag.name,
      slug: tag.slug,
      link: tag.path || '',
    };
  }
  const site = {
    pages: locals.pages.map(postMapper),
    posts: locals.posts.map(postMapper),
    tags: locals.tags.map(tagMapper),
    categories: locals.categories.map(tagMapper),
  };
  return {
    path: '/content.json',
    data: JSON.stringify(site),
  };
});
