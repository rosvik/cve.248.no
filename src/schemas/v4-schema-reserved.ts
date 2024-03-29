export const v4SchemaReserved = {
  $schema: "http://json-schema.org/draft-04/schema#",

  definitions: {
    cve_id: {
      type: "string",
      pattern: "^CVE-[0-9]{4}-[0-9]{4,}$",
    },
    email_address: {
      type: "string",
      pattern:
        "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
    },
    lang_string: {
      type: "object",
      required: ["lang", "value"],
      properties: {
        lang: { type: "string" },
        value: { type: "string", maxLength: 3999 },
      },
    },
  },

  type: "object",
  required: [
    "data_type",
    "data_format",
    "data_version",
    "CVE_data_meta",
    "description",
  ],
  properties: {
    data_type: { enum: ["CVE"] },
    data_format: { enum: ["MITRE"] },
    data_version: { enum: ["4.0"] },
    CVE_data_meta: {
      type: "object",
      required: ["ID", "ASSIGNER"],
      properties: {
        ID: { $ref: "#/definitions/cve_id" },
        ASSIGNER: { $ref: "#/definitions/email_address" },
        STATE: { enum: ["RESERVED"] },
      },
    },
    affects: {
      not: {},
    },
    description: {
      type: "object",
      required: ["description_data"],
      properties: {
        description_data: {
          type: "array",
          minItems: 1,
          items: { $ref: "#/definitions/lang_string" },
        },
      },
    },
    problemtype: {
      not: {},
    },
    references: {
      not: {},
    },
  },
};
