import cp from 'node:child_process';
import path from 'node:path';

(() => {
  const cwd = path.resolve(__dirname, '..');
  hexo.log.info('Working dir: ', cwd);
  if (hexo.env?.cmd?.startsWith('n')) {
    return;
  }
  if (hexo.env?.cmd?.startsWith('c')) {
    return;
  }
  if (hexo.env?.cmd === 's' || hexo.env?.cmd === 'server') {
    hexo.log.info('Starting js watch changer...');
    cp.exec('pnpm watch', { cwd: './themes/SoSimple' });
  }
  if (hexo.env?.cmd.startsWith('g') || hexo.env?.cmd.startsWith('d')) {
    hexo.log.info('Building js...');
    cp.execSync('pnpm build', { cwd: './themes/SoSimple', stdio: 'inherit' });
    hexo.log.info('Build successful!');
  }
})();