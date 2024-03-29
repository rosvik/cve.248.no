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

/**
 * Trim the input string to the specified length, and add an ellipsis if the
 * string was trimmed.
 *
 * @param str The string to trim
 * @param maxLength The maximum length of the string
 * @returns The trimmed string
 */
export function trimString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}

/**
 * Validate a CVE ID to ensure it is in the correct format, using regex.
 *
 * @param cveId The CVE ID to validate
 * @returns Whether the CVE ID is valid
 */
export function validateCveId(cveId: string): boolean {
  const regex = /^CVE-\d{4}-\d{4,}$/;
  return regex.test(cveId);
}
