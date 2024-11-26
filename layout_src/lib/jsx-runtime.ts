import type { HexoLocale } from "./hexo-data";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Attrs = Record<string, any> | null;

type ContentNode = string | null | undefined;

export type Component<Attrs = { hexo: HexoLocale }> = (attrs: Attrs, ...content: ContentNode[]) => string

const SELF_CLOSING = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]

export function escapeAttr(str?: string) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function escapeHtml(str?: string) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function h_str(tagName: string, attrs: Attrs, ...content: ContentNode[]) {
  tagName = tagName.toLowerCase();
  let str = `<${tagName}`;

  if (attrs != null) {
    for (const [key, val] of Object.entries(attrs)) {
      if (val === true) {
        str += ` ${key}`;
      } else if (val == null) {
        // continue
      } else {
        str += ` ${key}="${escapeAttr(String(val))}"`;
      }
    }
  }

  if (SELF_CLOSING.includes(tagName)) {
    str += ">";
  } else {
    str += `>${content.flat().join("")}</${tagName}>`;
  }

  return str;
}

export function h(
  elem: string | Component<any>,
  attrs: Attrs,
  ...content: ContentNode[]
) {

  const str = typeof elem === "string" ? h_str(elem, attrs, ...content) : elem(attrs, ...content)

  return str;
}
