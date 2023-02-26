import { CVE_JSON_40Public } from "./v4-cve-public";
import { CVE_JSON_40Reject } from "./v4-cve-reject";
import { CVE_JSON_40Reserved } from "./v4-cve-reserved";
import { CVEJSONRecordFormat, Published, Rejected } from "./v5-cve";

export type CVE =
  | CVEJSONRecordFormat
  | CVE_JSON_40Public
  | CVE_JSON_40Reject
  | CVE_JSON_40Reserved;

export type CVE5 = CVEJSONRecordFormat;

export type CVE4 = CVE_JSON_40Public | CVE_JSON_40Reject | CVE_JSON_40Reserved;

export enum CVE4_State {
  Reserved = "RESERVED",
  Public = "PUBLIC",
  Reject = "REJECT",
}

export enum CVE5_State {
  Published = "PUBLISHED",
  Rejected = "REJECTED",
}

export type CVE_Option =
  | { version: 5; state: CVE5_State.Published; data: Published }
  | { version: 5; state: CVE5_State.Rejected; data: Rejected }
  | { version: 4; state: CVE4_State.Reserved; data: CVE_JSON_40Reserved }
  | { version: 4; state: CVE4_State.Public; data: CVE_JSON_40Public }
  | { version: 4; state: CVE4_State.Reject; data: CVE_JSON_40Reject };
