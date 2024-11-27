import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

function defineSchema<C extends JSONSchema>(c: C) {
  return c;
}

export const themeConfigSchema = defineSchema({
  type: 'object',
  properties: {
    author: { type: ['string', 'null'] },
    keywords: { type: ['string', 'null'] },
    description: { type: ['string', 'null'] },
    defaultTheme: {
      anyOf: [{ enum: ['light', 'dark', ''] }, { type: 'null' }],
    },
    favicon: {
      type: ['string', 'null'],
    },
    menu: {
      type: 'object',
      additionalProperties: {
        type: 'string',
      },
    },
    toc_max_depth: { type: 'integer', default: 6 },
    footer: {
      type: 'object',
      properties: {
        text: { type: ['string', 'null'] },
        html: { type: ['string', 'null'] },
        enable_powered_by: { type: ['boolean', 'null'] },
      },
    },
    style: {
      type: 'object',
      properties: {
        post_excerpt: {
          type: 'object',
          properties: {
            summary_mode: { type: ['boolean', 'null'], default: false },
          },
        },
        post_meta: {
          type: 'object',
          properties: {
            date_format: { type: 'string', default: 'YYYY-MM-DD' },
            show_icon: { type: ['boolean', 'null'], default: true },
          },
        },
      },
      required: ['post_excerpt', 'post_meta'],
    },
    comment: {
      type: 'object',
      properties: {
        enable: { anyOf: [{ enum: ['gitalk', ''] }, { type: 'null' }] },
        gitalk: {
          type: 'object',
          properties: {
            clientID: { type: 'string' },
            clientSecret: { type: 'string' },
            repo: { type: 'string' },
            owner: { type: ['string'] },
            admin: { type: 'array', items: { type: 'string' } },
            distractionFreeMode: { type: ['boolean', 'null'] },
          },
          required: ['clientID', 'clientSecret', 'repo', 'owner'],
        },
      },
    },
  },
  required: ['toc_max_depth', 'menu', 'style', 'footer'],
} as const);

export type ThemeConfig = FromSchema<typeof themeConfigSchema>;
