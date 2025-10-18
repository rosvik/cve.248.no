import { GithubAdvisory } from "../types/GithubAdvisory";
import { sanitizeMarkdown } from "./sanitize-markdown";

export async function sanitizeGithubAdvisories(
  advisories: GithubAdvisory[]
): Promise<GithubAdvisory[]> {
  return await Promise.all(
    advisories.map(async (advisory) => sanitizeGithubAdvisory(advisory))
  );
}

async function sanitizeGithubAdvisory(
  advisory: GithubAdvisory
): Promise<GithubAdvisory> {
  if (!advisory.description) return advisory;
  return {
    ...advisory,
    description: await sanitizeMarkdown(advisory.description),
  };
}
