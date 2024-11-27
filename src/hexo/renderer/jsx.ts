import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import type { LocalsType } from 'hexo/dist/types';
import type { StoreFunctionData } from 'hexo/dist/extend/renderer';
import { checkConfig } from '@@/shared/check-config';

const watching = hexo.env?.cmd === 's' || hexo.env?.cmd === 'server';

const validate_config = (theme: unknown) => {
  if ((hexo as unknown as Record<string, boolean>).__sosimple_config_validated) {
    return;
  }
  if (!watching) {
    (hexo as unknown as Record<string, boolean>).__sosimple_config_validated = true;
  }
  try {
    checkConfig(theme);
  } catch (err) {
    hexo.log.error("SoSimple theme _config.yml validation failed! Please fix your theme's _config.yml");
    hexo.log.error(err);
    throw err;
  }
};

function getRenderer(filePath: string) {
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

function compile(data: StoreFunctionData) {
  return function render(locals: LocalsType) {
    validate_config(locals.theme);
    const Component = getRenderer(data.path);
    let renderedHTML = Component(locals);
    if (renderedHTML.slice(0, 5).toLowerCase() === '<html') {
      renderedHTML = `<!DOCTYPE html>${renderedHTML}`;
    }
    return renderedHTML;
  };
}

function renderer(data: StoreFunctionData, locals: LocalsType) {
  return compile(data)(locals);
}

renderer.compile = compile;
renderer.disableNunjucks = true;

hexo.extend.renderer.register('jsx', 'html', renderer as never, true);
