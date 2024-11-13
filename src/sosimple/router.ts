import { SiteStatic } from './site-static';

async function routeTo(link: string) {
  window.location.href = link.startsWith('/') ? SiteStatic.url_for(link) : link;
}

export const router = {
  routeTo,
};
