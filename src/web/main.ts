import '@/scss/color-defination.scss';
import '@/scss/blog_basic.scss';
import '@/scss/highlight.scss';
import '@/scss/hljs.scss';
import '@/scss/style.scss';
import '@/scss/gitalk.scss';

import { SoSimple } from '@/sosimple/sosimple';
import * as Utils from '@/utils/main';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(window as any).SoSimple = SoSimple;
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
(window as any).Utils = Utils;

import '@/scripts/make-code-name';
import '@/scripts/pretty-print';
import '@/scripts/load-font';
