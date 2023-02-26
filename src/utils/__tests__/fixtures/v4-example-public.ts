export const v4ExamplePublic = {
  CVE_data_meta: {
    ASSIGNER: "cve@mitre.org",
    ID: "CVE-2023-24139",
    STATE: "PUBLIC",
  },
  affects: {
    vendor: {
      vendor_data: [
        {
          product: {
            product_data: [
              {
                product_name: "n/a",
                version: {
                  version_data: [
                    {
                      version_value: "n/a",
                    },
                  ],
                },
              },
            ],
          },
          vendor_name: "n/a",
        },
      ],
    },
  },
  data_format: "MITRE",
  data_type: "CVE",
  data_version: "4.0",
  description: {
    description_data: [
      {
        lang: "eng",
        value:
          "TOTOLINK CA300-PoE V6.2c.884 was discovered to contain a command injection vulnerability via the NetDiagHost parameter in the setNetworkDiag function.",
      },
    ],
  },
  problemtype: {
    problemtype_data: [
      {
        description: [
          {
            lang: "eng",
            value: "n/a",
          },
        ],
      },
    ],
  },
  references: {
    reference_data: [
      {
        url: "https://github.com/Double-q1015/CVE-vulns/blob/main/totolink_ca300-poe/setNetworkDiag_NetDiagHost/setNetworkDiag_NetDiagHost.md",
        refsource: "MISC",
        name: "https://github.com/Double-q1015/CVE-vulns/blob/main/totolink_ca300-poe/setNetworkDiag_NetDiagHost/setNetworkDiag_NetDiagHost.md",
      },
    ],
  },
};
