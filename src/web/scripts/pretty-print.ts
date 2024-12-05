window.addEventListener('beforeprint', () => {
  document.documentElement.style.setProperty('--page-url', JSON.stringify(window.location.href));
});
