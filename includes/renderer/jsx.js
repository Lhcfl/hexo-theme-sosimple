function compile(data) {

  return function render(locals) {
    const Component = require(data.path);
    let renderedHTML = Component(locals);
    if (renderedHTML.slice(0, 5).toLowerCase() === '<html') {
      renderedHTML = `<!DOCTYPE html>${renderedHTML}`;
    }
    return renderedHTML;
  };
}

function renderer(data, locals) {
  return compile(data)(locals);
}

renderer.compile = compile;
renderer.disableNunjucks = true;

/** @param {import("hexo")} hexo */
module.exports = (hexo) => {
  hexo.extend.renderer.register('jsx', 'html', renderer, true);
}