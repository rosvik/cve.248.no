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
