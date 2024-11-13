module.exports = (hexo) => {
  if (hexo.env?.cmd?.startsWith('n')) return;
  hexo.log.info('SoSimple!');
};
