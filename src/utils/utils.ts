import { ProblemTypes, Published } from "../types/v5-cve";

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Parse a UTC date string into a Date object
 *
 * @param date The date string
 * @returns The Date object in UTC
 */
export function parseDateAsUTC(date: string | undefined): Date | null {
  if (!date) return null;
  if (date.endsWith("Z")) return new Date(date);

  // Date has a positive time zone
  if (date.indexOf("+") !== -1) return new Date(date);

  // Date has a negative time zone
  if (date.split("T")[1]?.indexOf("-") !== -1) return new Date(date);

  return new Date(date + "Z");
}

type ProblemType = ProblemTypes extends (infer U)[] ? U : never;
/**
 * Get all CWE IDs for a CVE based on its problem types
 *
 * @param cve The CVE
 * @returns A list of CWE IDs, without duplicates
 */
export function getCweIds(cve: Published): string[] {
  const getCweIdsFromProblemType = (pt: ProblemType): string[] =>
    pt.descriptions.map((d) => d.cweId).filter(Boolean) as string[];
  const allIds =
    cve.containers.cna.problemTypes
      ?.map((pt) => getCweIdsFromProblemType(pt))
      .flatMap((x) => x) ?? [];
  const uniqueIds = Array.from(new Set(allIds));
  return uniqueIds;
}