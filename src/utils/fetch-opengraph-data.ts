import { load } from "cheerio";

export type OpenGraphData = {
  title: string | null;
  description: string | null;
  image: string | null;
};

export async function fetchOpenGraphData(
  url: string
): Promise<OpenGraphData | undefined> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const $ = load(await res.text());
      const title =
        $('meta[property="og:title"]').attr("content")?.trim() || null;
      const description =
        $('meta[property="og:description"]').attr("content")?.trim() || null;
      const image =
        $('meta[property="og:image"]').attr("content")?.trim() || null;

      if (!title && !description && !image) return;

      return {
        title,
        description,
        image,
      };
    }
  } catch (error) {
    console.error(`Error fetching Open Graph data from ${url}\n`, error);
  }
}
