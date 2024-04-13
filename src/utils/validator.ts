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
import type { CVE_Option, CVE5 } from "../types/generic-cve";

export function validator(
  version: "v5" | "v4-reserved" | "v4-public" | "v4-reject"
) {
  const Ajv = new ajv();

  // @TODO: Potentially add `Ajv.addMetaSchema(v5Metaschema);`
  Ajv.addMetaSchema(v4Metaschema);

  // @TODO: Add `date-time` format
  // https://stackoverflow.com/a/58962975/5976426

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

export function validateUnknown(
  data: any
): CVE_Option | ajv.ErrorObject[] | false {
  const version = data?.dataVersion ?? data?.data_version;
  if (!(typeof version === "string")) return false;

  if (version === "5.0") {
    const validate = validator("v5");
    if (!validate(data)) return validate.errors || [];
    const cve = data as CVE5;
    if (cve.cveMetadata.state === "PUBLISHED") {
      return {
        version: 5,
        state: "PUBLISHED",
        data: data as Published,
      };
    }
    if (cve.cveMetadata.state === "REJECTED") {
      return { version: 5, state: "REJECTED", data: data as Rejected };
    }
  }

  if (version === "4.0") {
    const state = data?.CVE_data_meta?.STATE;
    if (!(typeof state === "string")) return false;

    if (state === "REJECT") {
      const validate = validator("v4-reject");
      if (!validate(data)) return validate.errors || [];
      return {
        version: 4,
        state: "REJECT",
        data: data as CVE_JSON_40Reject,
      };
    }

    if (state === "RESERVED") {
      const validate = validator("v4-reserved");

      if (!validate(data)) return validate.errors || [];
      return {
        version: 4,
        state: "RESERVED",
        data: data as CVE_JSON_40Reserved,
      };
    }

    if (state === "PUBLIC") {
      const validate = validator("v4-public");
      if (!validate(data)) return validate.errors || [];

      return {
        version: 4,
        state: "PUBLIC",
        data: data as CVE_JSON_40Public,
      };
    }
  }
  return false;
}

export function isPublished(
  input: Published | Rejected | undefined
): input is Published {
  return !!input && input.cveMetadata.state === "PUBLISHED";
}

export function unsafeIsPublished(input: any): input is Published {
  return !!input && input?.cveMetadata?.state === "PUBLISHED";
}
