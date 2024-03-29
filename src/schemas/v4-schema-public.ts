export const v4SchemaPublic = {
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
    product: {
      type: "object",
      required: ["product_name", "version"],
      properties: {
        product_name: { type: "string" },
        version: {
          type: "object",
          required: ["version_data"],
          properties: {
            version_data: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                required: ["version_value"],
                properties: {
                  version_value: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    reference: {
      type: "object",
      required: ["url"],
      properties: {
        url: {
          maxLength: 500,
          type: "string",
          pattern: "^(ftp|http)s?://\\S+$",
        },
      },
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
    "affects",
    "problemtype",
    "references",
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
      },
    },
    affects: {
      type: "object",
      required: ["vendor"],
      properties: {
        vendor: {
          type: "object",
          required: ["vendor_data"],
          properties: {
            vendor_data: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                required: ["vendor_name", "product"],
                properties: {
                  vendor_name: { type: "string" },
                  product: {
                    type: "object",
                    required: ["product_data"],
                    properties: {
                      product_data: {
                        type: "array",
                        minItems: 1,
                        items: { $ref: "#/definitions/product" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    problemtype: {
      type: "object",
      required: ["problemtype_data"],
      properties: {
        problemtype_data: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            required: ["description"],
            properties: {
              description: {
                type: "array",
                minItems: 1,
                items: { $ref: "#/definitions/lang_string" },
              },
            },
          },
        },
      },
    },
    references: {
      type: "object",
      required: ["reference_data"],
      properties: {
        reference_data: {
          type: "array",
          maxItems: 500,
          minItems: 1,
          items: { $ref: "#/definitions/reference" },
        },
      },
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
  },
};
