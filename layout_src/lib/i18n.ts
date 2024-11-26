import type { HexoLocale } from './hexo-data';

export interface Translation {
  prev: 'Previous';
  next: 'Next';
  prev_post: 'Previous';
  next_post: 'Next';
  Home: 'Home';
  Albums: 'Albums';
  Categories: 'Categories';
  Archives: 'Archives';
  Page: 'Page';
  Tags: 'Tags';
  TOC: 'Menu';
  About: 'About';
  Guestbook: 'Guestbook';
  Comments: 'Comments';
  Links: 'Links';
  author: 'Author';
  Search: 'Search';

  'insight.hint': 'Search...';
  'insight.posts': 'Posts';
  'insight.pages': 'Pages';
  'insight.categories': 'Categories';
  'insight.tags': 'Tags';
  'insight.untitled': '(Untitled)';
}

export function i18n<T extends keyof Translation>(hexo: HexoLocale, key: T) {
  return hexo.__!(key) as Translation[T];
}
