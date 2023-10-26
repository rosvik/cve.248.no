import { env } from "../env.mjs";
import { HNSearchResult } from "../types/HNSearch";

const HN_API_BASE_URL = env.HN_API_BASE_URL;

export async function searchHackerNews(
  query: string
): Promise<HNSearchResult | undefined> {
  const res = await fetch(`${HN_API_BASE_URL}search?query=${query}&tags=story`);
  if (!res.ok) return;
  const data = await res.json();
  const hnSearchResult = HNSearchResult.parse(data);
  return hnSearchResult;
}
