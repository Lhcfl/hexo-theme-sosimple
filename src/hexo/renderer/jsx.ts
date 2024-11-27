import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const watching = hexo.env?.cmd === 's' || hexo.env?.cmd === 'server';

function getRenderer(filePath) {
  if (watching) {
    const jsCode = fs.readFileSync(filePath).toString();
    const vm_module = { exports: {} };
    const vm_exports = vm_module.exports;
    const vm_context = {
      module: vm_module,
      exports: vm_exports,
      require,
      __dirname: path.dirname(filePath),
      __filename: filePath,
      console,
    };
    vm.createContext(vm_context);
    new vm.Script(jsCode).runInContext(vm_context);
    return vm_module.exports;
  }
  return require(filePath);
}

function compile(data) {
  return function render(locals) {
    const Component = getRenderer(data.path);
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

hexo.extend.renderer.register('jsx', 'html', renderer, true);
