import type { PageSchema, PostSchema } from 'hexo/dist/types';
import { AsRecord } from './types-trick';
import { escapeHtml } from '@/lib/jsx-runtime';

export function titleHTML(item: PageSchema | PostSchema, defaultValue = '') {
  return AsRecord(item).titleHTML || escapeHtml(item.title || '') || defaultValue;
}
