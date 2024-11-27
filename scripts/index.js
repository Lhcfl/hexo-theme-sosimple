if (!hexo.env?.cmd?.startsWith('n')) {
  hexo.log.info('SoSimple!');
}
if (hexo.env?.cmd?.startsWith('g') || hexo.env?.cmd?.startsWith('d') || hexo.env?.cmd?.startsWith('s')) {
  const cp = require("node:child_process");
  const cwd = hexo.theme_dir;
  hexo.log.info('Building Hexo Script...');
  cp.execSync("pnpm build-hexo-scripts", { cwd, stdio: 'inherit' })
  const str = require("node:fs").readFileSync(`${cwd}/dist/index.js`).toString();
  eval(str);
}