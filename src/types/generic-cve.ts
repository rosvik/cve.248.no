import type { CVE_JSON_40Public } from "./v4-cve-public";
import type { CVE_JSON_40Reject } from "./v4-cve-reject";
import type { CVE_JSON_40Reserved } from "./v4-cve-reserved";
import type { CVEJSONRecordFormat, Published, Rejected } from "./v5-cve";

export type CVE =
  | CVEJSONRecordFormat
  | CVE_JSON_40Public
  | CVE_JSON_40Reject
  | CVE_JSON_40Reserved;

export type CVE5 = CVEJSONRecordFormat;

export type CVE4 = CVE_JSON_40Public | CVE_JSON_40Reject | CVE_JSON_40Reserved;

export type CVE4_State = "RESERVED" | "PUBLIC" | "REJECT";

export type CVE5_State = "PUBLISHED" | "REJECTED";

export type CVE_Option =
  | { version: 5; state: "PUBLISHED"; data: Published }
  | { version: 5; state: "REJECTED"; data: Rejected }
  | { version: 4; state: "RESERVED"; data: CVE_JSON_40Reserved }
  | { version: 4; state: "PUBLIC"; data: CVE_JSON_40Public }
  | { version: 4; state: "REJECT"; data: CVE_JSON_40Reject };
