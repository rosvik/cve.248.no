import { marked } from "marked";
import { sanitizeHtml } from "./sanitize-html";

export const sanitizeMarkdown = async (markdown: string) => {
  const html = await marked.parse(markdown);
  return sanitizeHtml(html);
};
