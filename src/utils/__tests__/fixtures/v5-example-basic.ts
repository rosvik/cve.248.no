export const v5ExampleBasic = {
  dataType: "CVE_RECORD",
  dataVersion: "5.0",
  cveMetadata: {
    cveId: "CVE-1337-1234",
    assignerOrgId: "b3476cb9-2e3d-41a6-98d0-0f47421a65b6",
    state: "PUBLISHED",
  },
  containers: {
    cna: {
      providerMetadata: {
        orgId: "b3476cb9-2e3d-41a6-98d0-0f47421a65b6",
      },
      problemTypes: [
        {
          descriptions: [
            {
              lang: "en",
              description: "CWE-78 OS Command Injection",
            },
          ],
        },
      ],
      affected: [
        {
          vendor: "Example.org",
          product: "Example Enterprise",
          versions: [
            {
              version: "1.0.0",
              status: "affected",
              lessThan: "1.0.6",
              versionType: "semver",
            },
          ],
          defaultStatus: "unaffected",
        },
      ],
      descriptions: [
        {
          lang: "en",
          value:
            "OS Command Injection vulnerability parseFilename function of example.php in the Web Management Interface of Example.org Example Enterprise on Windows, MacOS and XT-4500 allows remote unauthenticated attackers to escalate privileges.\n\nThis issue affects:\n  *  1.0 versions before 1.0.6\n  *  2.1 versions from 2.16 until 2.1.9.",
        },
      ],
      references: [
        {
          url: "https://example.org/ESA-22-11-CVE-1337-1234",
        },
      ],
    },
  },
};
