import { z } from "zod";
const HNSearchHit = z.object({
  author: z.string(),
  children: z.array(z.number()).optional(),
  comment_text: z.string().optional(),
  created_at: z.string(),
  created_at_i: z.number(),
  num_comments: z.number(),
  objectID: z.string(),
  points: z.number(),
  story_id: z.number(),
  story_text: z.string().optional(),
  title: z.string(),
  updated_at: z.string().optional(),
  url: z.string(),
  _tags: z.array(z.string()),
});

export const HNSearchResult = z.object({
  exhaustive: z
    .object({
      nbHits: z.boolean().optional(),
      nbPages: z.boolean().optional(),
    })
    .optional(),
  exhaustiveNbHits: z.boolean().optional(),
  exhaustiveTypo: z.boolean().optional(),
  hits: z.array(HNSearchHit),
  hitsPerPage: z.number().optional(),
  nbHits: z.number().optional(),
  nbPages: z.number().optional(),
  page: z.number().optional(),
  params: z.string().optional(),
  processingTimeMS: z.any().optional(),
  query: z.string().optional(),
  serverTimeMS: z.number().optional(),
});

export type HNSearchResult = z.infer<typeof HNSearchResult>;
export type HNSearchHit = z.infer<typeof HNSearchHit>;
