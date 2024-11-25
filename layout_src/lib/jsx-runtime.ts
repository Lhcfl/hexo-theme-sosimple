// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Attrs = Record<string, any> | null;

type ContentNode = string | null | undefined;

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

export function h(tagName: string, attrs: Attrs, ...content: ContentNode[]) {
  tagName = tagName.toLowerCase();
  let str = `<${tagName}`;

  if (attrs != null) {
    for (const [key, val] of Object.entries(attrs)) {
      str += ` ${key}="${escapeAttr(val)}"`;
    }
  }

  if (SELF_CLOSING.includes(tagName)) {
    str += ">";
  } else {
    str += `>${content.join("")}</${tagName}>`;
  }

  return str;
}
