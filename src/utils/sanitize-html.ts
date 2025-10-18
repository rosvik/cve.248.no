import DOMPurify from "isomorphic-dompurify";

export const sanitizeHtml = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "a",
      "b",
      "i",
      "em",
      "strong",
      "p",
      "br",
      "pre",
      "code",
      "blockquote",
      "ul",
      "ol",
      "li",
    ],
    ALLOWED_ATTR: ["href"],
    KEEP_CONTENT: true,
  }).trimEnd();
};
