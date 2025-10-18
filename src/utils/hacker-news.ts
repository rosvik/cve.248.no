import { env } from "../env.mjs";
import { HNSearchResult } from "../types/HNSearch";
import { sanitizeHtml } from "./sanitize-html";

const HN_SEARCH_API_BASE_URL = env.HN_SEARCH_API_BASE_URL;

export async function searchHackerNews(
  query: string
): Promise<HNSearchResult | undefined> {
  const res = await fetch(`${HN_SEARCH_API_BASE_URL}search?query="${query}"`);
  if (!res.ok) return;
  const data = await res.json();
  const hnSearchResult = HNSearchResult.parse(data);

  const sanitizedHits = hnSearchResult.hits.map((hit) =>
    hit.comment_text
      ? {
          ...hit,
          comment_text: sanitizeHtml(hit.comment_text),
        }
      : hit
  );

  return {
    ...hnSearchResult,
    hits: sanitizedHits,
  };
}
