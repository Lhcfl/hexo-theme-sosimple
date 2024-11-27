let loadMermaid = () => {
  // @ts-ignore
  import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs').then(({ default: mermaid }) => {
    console.log('mermaid loaded', mermaid);
    mermaid.initialize({
      suppressErrorRendering: false,
      securityLevel: 'loose',
      startOnLoad: false,
    });
    mermaid.run({
      nodes: document.querySelectorAll('pre code.hljs.language-mermaid'),
    });
  });
  loadMermaid = () => {};
};

function makeLangName(lang: string | undefined, elem: Element) {
  if (lang === 'mermaid') {
    loadMermaid();
  } else if (lang) {
    const tag = document.createElement('aside');
    tag.classList.add('language-name');
    tag.textContent = lang;
    elem.prepend(tag);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code.hljs').forEach((elem) => {
    elem.classList.forEach((name) => {
      const lang = name.match(/language-([\s\S]+)/)?.[1];
      makeLangName(lang, elem);
    });
  });
  document.querySelectorAll('figure.highlight').forEach((elem) => {
    const lang = [...elem.classList.values()].at(-1);
    makeLangName(lang, elem);
  });
});
