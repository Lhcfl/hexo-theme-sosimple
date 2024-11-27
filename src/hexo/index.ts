if (!hexo.env?.cmd?.startsWith('n')) {
  hexo.log.info('SoSimple!');
}

import './tasks/rollup';
import './generators/extra-layouts';
import './generators/insight';
import './renderer/jsx';
