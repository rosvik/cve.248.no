import DOMPurify from "isomorphic-dompurify";
import { env } from "../env.mjs";
import { HNSearchResult } from "../types/HNSearch";

const HN_API_BASE_URL = env.HN_API_BASE_URL;

export async function searchHackerNews(
  query: string
): Promise<HNSearchResult | undefined> {
  const res = await fetch(`${HN_API_BASE_URL}search?query=${query}`);
  if (!res.ok) return;
  const data = await res.json();
  const hnSearchResult = HNSearchResult.parse(data);

  const sanitizedHits = hnSearchResult.hits.map((hit) =>
    hit.comment_text
      ? {
          ...hit,
          comment_text: sanitize_html(hit.comment_text),
        }
      : hit
  );

  return {
    ...hnSearchResult,
    hits: sanitizedHits,
  };
}

const sanitize_html = (comment_text: string) => {
  return DOMPurify.sanitize(comment_text, {
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
