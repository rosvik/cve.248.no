/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ajv from "ajv";

import { v4Metaschema } from "../schemas/v4-metaschema";

import { v4SchemaReserved } from "../schemas/v4-schema-reserved";
import { v4SchemaPublic } from "../schemas/v4-schema-public";
import { v4SchemaReject } from "../schemas/v4-schema-reject";
import { v5Schema } from "../schemas/v5-schema";

import type { Published, Rejected } from "../types/v5-cve";
import type { CVE_JSON_40Reject } from "../types/v4-cve-reject";
import type { CVE_JSON_40Reserved } from "../types/v4-cve-reserved";
import type { CVE_JSON_40Public } from "../types/v4-cve-public";
import { CVE5_State, CVE4_State } from "../types/cve";
import type { CVE_Option, CVE5 } from "../types/cve";

export function validator(
  version: "v5" | "v4-reserved" | "v4-public" | "v4-reject"
) {
  const Ajv = new ajv();

  // @TODO: Potentially add `Ajv.addMetaSchema(v5Metaschema);`
  Ajv.addMetaSchema(v4Metaschema);

  switch (version) {
    case "v5":
      return Ajv.compile(v5Schema);
    case "v4-reserved":
      return Ajv.compile(v4SchemaReserved);
    case "v4-public":
      return Ajv.compile(v4SchemaPublic);
    case "v4-reject":
      return Ajv.compile(v4SchemaReject);
  }
}

export function validateUnknown(data: any): CVE_Option | undefined {
  const version = data?.dataVersion ?? data?.data_version;
  if (!(typeof version === "string")) return;

  if (version === "5.0") {
    const validate = validator("v5");
    if (!validate(data)) return;
    const cve = data as CVE5;
    if (cve.cveMetadata.state === "PUBLISHED") {
      return {
        version: 5,
        state: CVE5_State.Published,
        data: data as Published,
      };
    }
    if (cve.cveMetadata.state === "REJECTED") {
      return { version: 5, state: CVE5_State.Rejected, data: data as Rejected };
    }
  }

  if (version === "4.0") {
    const state = data?.CVE_data_meta?.STATE;
    if (!(typeof state === "string")) return;

    if (state === "REJECT") {
      const validate = validator("v4-reject");
      if (!validate(data)) return;
      return {
        version: 4,
        state: CVE4_State.Reject,
        data: data as CVE_JSON_40Reject,
      };
    }

    if (state === "RESERVED") {
      const validate = validator("v4-reserved");
      if (!validate(data)) return;
      return {
        version: 4,
        state: CVE4_State.Reserved,
        data: data as CVE_JSON_40Reserved,
      };
    }

    if (state === "PUBLIC") {
      const validate = validator("v4-public");
      if (!validate(data)) return;
      return {
        version: 4,
        state: CVE4_State.Public,
        data: data as CVE_JSON_40Public,
      };
    }
  }
}
