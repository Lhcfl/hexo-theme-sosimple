// From theme icarus
/** @param {import("hexo")} hexo */
module.exports = (hexo) => {
  hexo.extend.helper.register('post_count', function () {
    return this.site.posts.length;
  });

  hexo.extend.helper.register('category_count', function () {
    return this.site.categories.filter((category) => category.length).length;
  });

  hexo.extend.helper.register('tag_count', function () {
    return this.site.tags.filter((tag) => tag.length).length;
  });

  /**
   * Get the word count of a paragraph.
   */
  hexo.extend.helper.register('word_count', (content) => {
    const cnt = content.replace(/<\/?[a-z][^>]*>/gi, '').trim();
    return cnt ? (cnt.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length : 0;
  });
};
