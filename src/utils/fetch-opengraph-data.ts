import { load } from "cheerio";
import { Reference } from "../types/v5-cve";

export type OpenGraphData = {
  title: string | null;
  description: string | null;
  image: string | null;
};

export async function fetchOpenGraphData(
  url: string
): Promise<OpenGraphData | undefined> {
  try {
    const srcUrl = new URL(url);
    const res = await fetch(srcUrl.href);
    if (res.ok) {
      const $ = load(await res.text());
      const title =
        $('meta[property="og:title"]').attr("content")?.trim() || null;
      const description =
        $('meta[property="og:description"]').attr("content")?.trim() || null;
      let image =
        $('meta[property="og:image"]').attr("content")?.trim() || null;

      if (!title && !description && !image) return;

      if (image && !image.startsWith("http")) {
        try {
          const imageUrl = new URL(`${srcUrl.origin}${image}`);
          image = imageUrl.href;
        } catch (error) {
          console.error(
            `Error parsing opengraph image URL ${image} for ${url}:`,
            error
          );
          image = null;
        }
      }

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

export async function fetchOpenGraphForReferences(
  references: Reference[]
): Promise<void> {
  references.map(async (reference) => {
    const ogd = await fetchOpenGraphData(reference.url);
    if (ogd) reference.openGraphData = ogd;
    return ogd;
  });
}
