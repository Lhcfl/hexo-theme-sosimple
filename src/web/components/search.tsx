import './search.scss';
import Fuse, { type FuseResult } from 'fuse.js';
import { SoSimpleDynamicResource } from '@/sosimple/dynamic-resource';
import { SoSimpleRef } from '@/sosimple/ref';
import { escapeHTML, nextTick } from '@/utils/main';
import { Component } from './base';
import { router } from '@/sosimple/router';
import type { SearchResourceCollection, SearchResource, SearchResourcePage } from '@/types/search';
import { h } from '@/utils/main';
import { SiteStatic } from '@/sosimple/site-static';

const SEARCH_RESULT_LIMIT = 10;

const SEARCHABLE = ['posts', 'pages', 'tags', 'categories'] as const;

type SEARCHABLE_T = 'posts' | 'pages' | 'tags' | 'categories';

type SearchResult =
  | (FuseResult<SearchResourceCollection> | SearchResourceCollection)[]
  | (FuseResult<SearchResourcePage> | SearchResourcePage)[];

export type SoSimpleSearchConfig = { translation?: Record<string, string> };

export class SoSimpleSearch extends Component {
  searchData: SoSimpleDynamicResource<SearchResource>;
  config: SoSimpleSearchConfig = {};
  showing = false;

  get mainEl() {
    return document.querySelector('.ins-search') as HTMLElement;
  }
  get inputEl() {
    return this.mainEl?.querySelector('.ins-search-input') as HTMLInputElement;
  }
  get wrapperEl() {
    return this.mainEl?.querySelector('.ins-section-wrapper') as HTMLElement;
  }
  get containerEl() {
    return this.mainEl?.querySelector('.ins-section-container') as HTMLElement;
  }

  fuses: {
    pages?: Fuse<SearchResourcePage>;
    posts?: Fuse<SearchResourcePage>;
    tags?: Fuse<SearchResourceCollection>;
    categories?: Fuse<SearchResourceCollection>;
  } = {};

  fuse_ok = new SoSimpleRef(false);

  constructor(config: SoSimpleSearchConfig) {
    super();
    this.searchData = new SoSimpleDynamicResource('content.json');
    this.config = config;
  }

  init() {
    this.buildFuse();

    this.inputEl.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowDown':
          this.markActive(this.getSelectedIndex() + 1);
          break;
        case 'ArrowUp':
          this.markActive(this.getSelectedIndex() - 1);
          break;
        case 'Enter': {
          const url = (document.querySelector('.ins-selectable.active') as HTMLElement)?.dataset.url;
          if (url) this.gotoLink(url);
          break;
        }
      }
    });
    this.inputEl.addEventListener('input', () => {
      nextTick(() => {
        this.search();
      });
    });

    nextTick(() => {
      this.search();
    });

    this.inputEl.focus();
  }

  getSelectedIndex() {
    let index = -1;
    document.querySelectorAll('.ins-selectable').forEach((elem, id) => {
      if (elem.classList.contains('active')) index = id;
    });
    return index;
  }

  markActive(index: number) {
    const items = document.querySelectorAll('.ins-selectable');
    index = (index + Number(index === -2) + items.length) % items.length;

    items.forEach((elem, id) => {
      elem.classList.remove('active');
      if (id === index) {
        elem.classList.add('active');
      }
    });
  }

  gotoLink(url: string) {
    router.routeTo(url);
  }

  makeSearchItem(icon: string | null, title: string | null, slug: string | null, preview: string | null, url: string) {
    url = SiteStatic.url_for(url);
    return (
      <div
        class="ins-selectable ins-search-item"
        data-url={url}
        onclick={() => {
          this.gotoLink(url);
        }}
      >
        <header>
          <i class={`fa fa-${icon}`} />
          <span class="ins-title">{title != null && title !== '' ? title : this.config.translation?.untitled}</span>
          {slug && slug !== title ? <span class="ins-slug">{slug}</span> : null}
        </header>
        {preview ? <p class="ins-search-preview">{preview}</p> : null}
      </div>
    );
  }

  makeSection(sectionType: SEARCHABLE_T, array: SearchResult) {
    const sectionTitle = this.config.translation?.[sectionType] as string;
    if (array.length === 0) return null;

    const searchItems = array.map((item) => {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const newItem: Record<string, any> = {};

      for (const [key, val] of Object.entries(item)) {
        if (key === 'link') {
          newItem[key] = val;
          continue;
        }
        newItem[key] = escapeHTML(val);
      }

      const matches = ('matches' in item ? item.matches : null) ?? [];

      for (const matched of matches) {
        if (matched.key === 'link') continue;
        if (matched.key == null) continue;

        const [st, ed] = matched.indices.reduce((a, b) => (a[1] - a[0] < b[1] - b[0] ? b : a), [0, -1]);

        newItem[matched.key] =
          // biome-ignore lint/style/useTemplate: <explanation>
          escapeHTML((item as unknown as Record<string, string>)[matched.key].slice(0, st)) +
          '<mark>' +
          escapeHTML((item as unknown as Record<string, string>)[matched.key].slice(st, ed + 1)) +
          '</mark>' +
          escapeHTML((item as unknown as Record<string, string>)[matched.key].slice(ed + 1));
        if (matched.key === 'text') {
          newItem.text = newItem.text.slice(Math.max(st - 20, 0));
        }
      }

      if (['posts', 'pages'].includes(sectionType)) {
        return this.makeSearchItem('file', newItem.title, null, newItem.text.slice(0, 350), newItem.link);
      }
      if (['categories', 'tags'].includes(sectionType)) {
        return this.makeSearchItem(
          sectionType === 'categories' ? 'folder' : 'tag',
          newItem.name,
          newItem.slug,
          null,
          newItem.link,
        );
      }
      return null;
    });

    return (
      <section class="ins-section">
        <header class="ins-section-header">{sectionTitle}</header>
        {searchItems}
      </section>
    );
  }

  async buildFuse() {
    const data = await this.searchData.data();
    Fuse.config.ignoreLocation = true;
    Fuse.config.includeMatches = true;

    this.fuses.posts = new Fuse(data.posts, {
      keys: ['title', 'text', 'link'],
    });
    this.fuses.pages = new Fuse(data.pages, {
      keys: ['title', 'text', 'link'],
    });
    this.fuses.tags = new Fuse(data.tags, { keys: ['name', 'slug', 'link'] });
    this.fuses.categories = new Fuse(data.categories, {
      keys: ['name', 'slug', 'link'],
    });

    this.fuse_ok.value = true;
  }

  async getSearchResult(keyword: string) {
    await this.fuse_ok.unitl(true);
    const data = await this.searchData.data();

    const searched = <T extends keyof SearchResource>(t: T) => {
      return keyword
        ? this.fuses[t]!.search(keyword, { limit: SEARCH_RESULT_LIMIT }).map((res) => ({ ...res, ...res.item }))
        : data[t].slice(0, SEARCH_RESULT_LIMIT);
    };

    return SEARCHABLE.map((s) => [s, searched(s)] as [SEARCHABLE_T, SearchResult]);
  }

  search() {
    const keyword = this.inputEl.value;
    this.getSearchResult(keyword).then((res) => {
      this.containerEl.innerHTML = '';
      for (const [key, result] of res) {
        const section = this.makeSection(key, result);
        if (section) this.containerEl.appendChild(section);
      }
    });
  }

  selectItemByDiff(value: number) {
    const items = this.containerEl.querySelectorAll('.ins-selectable');
    let prevPosition = -1;
    items.forEach((elem, index) => {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active');
        prevPosition = index;
        return;
      }
    });
    const nextPosition = (items.length + prevPosition + value) % items.length;
    items[nextPosition].classList.add('active');
  }
}
