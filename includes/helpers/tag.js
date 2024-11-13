const util = require('hexo-util');

/** @param {import("hexo")} hexo */
module.exports = (hexo) => {
  hexo.extend.helper.register('alphabet_tag_list', (tags) => {
    const tag_dict = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    tags.forEach((tag) => {
      if (/^[0-9]/.test(tag.name)) {
        if (!tag_dict['0-9']) {
          tag_dict['0-9'] = [];
        }
        tag_dict['0-9'].push(tag);
      } else if (/^[a-zA-Z]/.test(tag.name)) {
        const firstL = tag.name[0].toUpperCase();
        if (!tag_dict[firstL]) {
          tag_dict[firstL] = [];
        }
        tag_dict[firstL].push(tag);
      } else {
        const firstL = '#';
        if (!tag_dict[firstL]) {
          tag_dict[firstL] = [];
        }
        tag_dict[firstL].push(tag);
      }
    });

    return Object.keys(tag_dict)
      .sort()
      .map((id) => ({
        alphabet: id,
        tags: tag_dict[id].sort((tag1, tag2) => (tag1.name < tag2.name ? -1 : 1)),
      }));
  });
};
