const cp = require("node:child_process");
 
const cwd = __dirname + "/../";
hexo.log.info('Building Hexo Script...');
cp.execSync("pnpm build-hexo-scripts", { cwd, stdio: 'inherit' })
const str = require("node:fs").readFileSync(`${cwd}/dist/index.js`).toString();
eval(str);