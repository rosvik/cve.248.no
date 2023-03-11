export const v5Schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "https://cve.org/cve/record/v5_00/",
  type: "object",
  title: "CVE JSON record format",
  description:
    "cve-schema specifies the CVE JSON record format. This is the blueprint for a rich set of JSON data that can be submitted by CVE Numbering Authorities (CNAs) and Authorized Data Publishers (ADPs) to describe a CVE Record. Some examples of CVE Record data include CVE ID number, affected product(s), affected version(s), and public references. While those specific items are required when assigning a CVE, there are many other optional data in the schema that can be used to enrich CVE Records for community benefit. Learn more about the CVE program at [the official website](https://cve.mitre.org). This CVE JSON record format is defined using JSON Schema. Learn more about JSON Schema [here](https://json-schema.org/).",
  definitions: {
    uriType: {
      description:
        "A universal resource identifier (URI), according to [RFC 3986](https://tools.ietf.org/html/rfc3986).",
      type: "string",
      format: "uri",
      minLength: 1,
      maxLength: 2048,
    },
    uuidType: {
      description:
        "A version 4 (random) universally unique identifier (UUID) as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122#section-4.1.3).",
      type: "string",
      pattern:
        "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$",
    },
    reference: {
      type: "object",
      required: ["url"],
      properties: {
        url: {
          description:
            "The uniform resource locator (URL), according to [RFC 3986](https://tools.ietf.org/html/rfc3986#section-1.1.3), that can be used to retrieve the referenced resource.",
          $ref: "#/definitions/uriType",
        },
        name: {
          description:
            "User created name for the reference, often the title of the page.",
          type: "string",
          maxLength: 512,
          minLength: 1,
        },
        tags: {
          description:
            "An array of one or more tags that describe the resource referenced by 'url'.",
          type: "array",
          minItems: 1,
          uniqueItems: true,
          items: {
            oneOf: [
              {
                $ref: "#/definitions/tagExtension",
              },
              {
                $schema: "http://json-schema.org/draft-07/schema#",
                $id: "https://cve.mitre.org/cve/v5_00/tags/reference/",
                type: "string",
                description:
                  "broken-link: The reference link is returning a 404 error, or the site is no longer online.\n\ncustomer-entitlement: Similar to Privileges Required, but specific to references that require non-public/paid access for customers of the particular vendor.\n\nexploit: Reference contains an in-depth/detailed description of steps to exploit a vulnerability OR the reference contains any legitimate Proof of Concept (PoC) code or exploit kit.\n\ngovernment-resource: All reference links that are from a government agency or organization should be given the Government Resource tag.\n\nissue-tracking: The reference is a post from a bug tracking tool such as MantisBT, Bugzilla, JIRA, Github Issues, etc...\n\nmailing-list: The reference is from a mailing list -- often specific to a product or vendor.\n\nmitigation: The reference contains information on steps to mitigate against the vulnerability in the event a patch can't be applied or is unavailable or for EOL product situations.\n\nnot-applicable: The reference link is not applicable to the vulnerability and was likely associated by MITRE accidentally (should be used sparingly).\n\npatch: The reference contains an update to the software that fixes the vulnerability.\n\npermissions-required: The reference link provided is blocked by a logon page. If credentials are required to see any information this tag must be applied.\n\nmedia-coverage: The reference is from a media outlet such as a newspaper, magazine, social media, or weblog. This tag is not intended to apply to any individual's personal social media account. It is strictly intended for public media entities.\n\nproduct: A reference appropriate for describing a product for the purpose of CPE or SWID.\n\nrelated: A reference that is for a related (but not the same) vulnerability.\n\nrelease-notes: The reference is in the format of a vendor or open source project's release notes or change log.\n\nsignature: The reference contains a method to detect or prevent the presence or exploitation of the vulnerability.\n\ntechnical-description: The reference contains in-depth technical information about a vulnerability and its exploitation process, typically in the form of a presentation or whitepaper.\n\nthird-party-advisory: Advisory is from an organization that is not the vulnerable product's vendor/publisher/maintainer.\n\nvendor-advisory: Advisory is from the vendor/publisher/maintainer of the product or the parent organization.\n\nvdb-entry: VDBs are loosely defined as sites that provide information about this vulnerability, such as advisories, with identifiers. Included VDBs are free to access, substantially public, and have broad scope and coverage (not limited to a single vendor or research organization). See: https://www.first.org/global/sigs/vrdx/vdb-catalog",
                enum: [
                  "broken-link",
                  "customer-entitlement",
                  "exploit",
                  "government-resource",
                  "issue-tracking",
                  "mailing-list",
                  "mitigation",
                  "not-applicable",
                  "patch",
                  "permissions-required",
                  "media-coverage",
                  "product",
                  "related",
                  "release-notes",
                  "signature",
                  "technical-description",
                  "third-party-advisory",
                  "vendor-advisory",
                  "vdb-entry",
                ],
              },
            ],
          },
        },
      },
    },
    cveId: {
      type: "string",
      pattern: "^CVE-[0-9]{4}-[0-9]{4,19}$",
    },
    orgId: {
      description:
        "A UUID for an organization participating in the CVE program. This UUID can be used to lookup the organization record in the user registry service.",
      $ref: "#/definitions/uuidType",
    },
    userId: {
      description:
        "A UUID for a user participating in the CVE program. This UUID can be used to lookup the user record in the user registry service.",
      $ref: "#/definitions/uuidType",
    },
    shortName: {
      description:
        "A 2-32 character name that can be used to complement an organization's UUID.",
      type: "string",
      minLength: 2,
      maxLength: 32,
    },
    datestamp: {
      description: "Date/time format based on RFC3339 and ISO ISO8601.",
      type: "string",
      format: "date",
      pattern:
        "^((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30))$",
    },
    timestamp: {
      type: "string",
      description:
        "Date/time format based on RFC3339 and ISO ISO8601, with an optional timezone in the format 'yyyy-MM-ddTHH:mm:ssZZZZ'. If timezone offset is not given, GMT (0000) is assumed.",
      pattern:
        "^(((2000|2400|2800|(19|2[0-9](0[48]|[2468][048]|[13579][26])))-02-29)|(((19|2[0-9])[0-9]{2})-02-(0[1-9]|1[0-9]|2[0-8]))|(((19|2[0-9])[0-9]{2})-(0[13578]|10|12)-(0[1-9]|[12][0-9]|3[01]))|(((19|2[0-9])[0-9]{2})-(0[469]|11)-(0[1-9]|[12][0-9]|30)))T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-][0-9]{2}:[0-9]{2})?$",
    },
    version: {
      description:
        "A single version of a product, as expressed in its own version numbering scheme.",
      type: "string",
      minLength: 1,
      maxLength: 1024,
    },
    status: {
      description:
        "The vulnerability status of a given version or range of versions of a product. The statuses 'affected' and 'unaffected' indicate that the version is affected or unaffected by the vulnerability. The status 'unknown' indicates that it is unknown or unspecified whether the given version is affected. There can be many reasons for an 'unknown' status, including that an investigation has not been undertaken or that a vendor has not disclosed the status.",
      type: "string",
      enum: ["affected", "unaffected", "unknown"],
    },
    product: {
      type: "object",
      description:
        "Provides information about the set of products and services affected by this vulnerability.",
      allOf: [
        {
          anyOf: [
            {
              required: ["vendor", "product"],
            },
            {
              required: ["collectionURL", "packageName"],
            },
          ],
        },
        {
          anyOf: [
            {
              required: ["versions"],
            },
            {
              required: ["defaultStatus"],
            },
          ],
        },
      ],
      properties: {
        vendor: {
          type: "string",
          description:
            "Name of the organization, project, community, individual, or user that created or maintains this product or hosted service. Can be 'N/A' if none of those apply. When collectionURL and packageName are used, this field may optionally represent the user or account within the package collection associated with the package.",
          minLength: 1,
          maxLength: 512,
        },
        product: {
          type: "string",
          description: "Name of the affected product.",
          minLength: 1,
          maxLength: 2048,
        },
        collectionURL: {
          description:
            "URL identifying a package collection (determines the meaning of packageName).",
          $ref: "#/definitions/uriType",
          examples: [
            "https://access.redhat.com/downloads/content/package-browser",
            "https://addons.mozilla.org",
            "https://addons.thunderbird.net",
            "https://anaconda.org/anaconda/repo",
            "https://app.vagrantup.com/boxes/search",
            "https://apps.apple.com",
            "https://archlinux.org/packages",
            "https://atmospherejs.meteor.com",
            "https://atom.io/packages",
            "https://bitbucket.org",
            "https://bower.io",
            "https://brew.sh/",
            "https://chocolatey.org/packages",
            "https://chrome.google.com/webstore",
            "https://clojars.org",
            "https://cocoapods.org",
            "https://code.dlang.org",
            "https://conan.io/center",
            "https://cpan.org/modules",
            "https://cran.r-project.org",
            "https://crates.io",
            "https://ctan.org/pkg",
            "https://drupal.org",
            "https://exchange.adobe.com",
            "https://forge.puppet.com/modules",
            "https://github.com",
            "https://gitlab.com/explore",
            "https://golang.org/pkg",
            "https://guix.gnu.org/packages",
            "https://hackage.haskell.org",
            "https://helm.sh",
            "https://hub.docker.com",
            "https://juliahub.com",
            "https://lib.haxe.org",
            "https://luarocks.org",
            "https://marketplace.visualstudio.com",
            "https://melpa.org",
            "https://microsoft.com/en-us/store/apps",
            "https://nimble.directory",
            "https://nuget.org/packages",
            "https://opam.ocaml.org/packages",
            "https://openwrt.org/packages/index",
            "https://package.elm-lang.org",
            "https://packagecontrol.io",
            "https://packages.debian.org",
            "https://packages.gentoo.org",
            "https://packagist.org",
            "https://pear.php.net/packages.php",
            "https://pecl.php.net",
            "https://platformio.org/lib",
            "https://play.google.com/store",
            "https://plugins.gradle.org",
            "https://projects.eclipse.org",
            "https://pub.dev",
            "https://pypi.python.org",
            "https://registry.npmjs.org",
            "https://registry.terraform.io",
            "https://repo.hex.pm",
            "https://repo.maven.apache.org/maven2",
            "https://rubygems.org",
            "https://search.nixos.org/packages",
            "https://sourceforge.net",
            "https://wordpress.org/plugins",
          ],
        },
        packageName: {
          type: "string",
          description:
            "Name or identifier of the affected software package as used in the package collection.",
          minLength: 1,
          maxLength: 2048,
        },
        cpes: {
          type: "array",
          description:
            'Affected products defined by CPE. This is an array of CPE values (vulnerable and not), we use an array so that we can make multiple statements about the same version and they are separate (if we used a JSON object we\'d essentially be keying on the CPE name and they would have to overlap). Also, this allows things like cveDataVersion or cveDescription to be applied directly to the product entry. This also allows more complex statements such as "Product X between versions 10.2 and 10.8" to be put in a machine-readable format. As well since multiple statements can be used multiple branches of the same product can be defined here.',
          uniqueItems: true,
          items: {
            title: "CPE Name",
            type: "string",
            description:
              "Common Platform Enumeration (CPE) Name in either 2.2 or 2.3 format",
            pattern:
              "([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9._\\-~%]*){0,6})|(cpe:2\\.3:[aho*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-._]|(\\\\[\\\\*?!\"#$%&'()+,/:;<=>@\\[\\]\\^`{|}~]))+(\\?*|\\*?))|[*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-._]|(\\\\[\\\\*?!\"#$%&'()+,/:;<=>@\\[\\]\\^`{|}~]))+(\\?*|\\*?))|[*\\-])){4})",
            minLength: 1,
            maxLength: 2048,
          },
        },
        modules: {
          type: "array",
          description:
            "A list of the affected components, features, modules, sub-components, sub-products, APIs, commands, utilities, programs, or functionalities (optional).",
          uniqueItems: true,
          items: {
            type: "string",
            description:
              "Name of the affected component, feature, module, sub-component, sub-product, API, command, utility, program, or functionality (optional).",
            minLength: 1,
            maxLength: 4096,
          },
        },
        programFiles: {
          type: "array",
          description: "A list of the affected source code files (optional).",
          uniqueItems: true,
          items: {
            description:
              "Name or path or location of the affected source code file.",
            type: "string",
            minLength: 1,
            maxLength: 1024,
          },
        },
        programRoutines: {
          type: "array",
          description:
            "A list of the affected source code functions, methods, subroutines, or procedures (optional).",
          uniqueItems: true,
          items: {
            type: "object",
            description: "An object describing program routine.",
            required: ["name"],
            properties: {
              name: {
                type: "string",
                description:
                  "Name of the affected source code file, function, method, subroutine, or procedure.",
                minLength: 1,
                maxLength: 4096,
              },
            },
          },
        },
        platforms: {
          title: "Platforms",
          description:
            "List of specific platforms if the vulnerability is only relevant in the context of these platforms (optional). Platforms may include execution environments, operating systems, virtualization technologies, hardware models, or computing architectures. The lack of this field or an empty array implies that the other fields are applicable to all relevant platforms.",
          type: "array",
          minItems: 1,
          uniqueItems: true,
          items: {
            type: "string",
            examples: [
              "iOS",
              "Android",
              "Windows",
              "macOS",
              "x86",
              "ARM",
              "64 bit",
              "Big Endian",
              "iPad",
              "Chromebook",
              "Docker",
              "Model T",
            ],
            maxLength: 1024,
          },
        },
        repo: {
          description:
            "The URL of the source code repository, for informational purposes and/or to resolve git hash version ranges.",
          $ref: "#/definitions/uriType",
        },
        defaultStatus: {
          description:
            "The default status for versions that are not otherwise listed in the versions list. If not specified, defaultStatus defaults to 'unknown'. Versions or defaultStatus may be omitted, but not both.",
          $ref: "#/definitions/status",
        },
        versions: {
          type: "array",
          description:
            "Set of product versions or version ranges related to the vulnerability. The versions satisfy the CNA Rules [8.1.2 requirement](https://cve.mitre.org/cve/cna/rules.html#section_8-1_cve_entry_information_requirements). Versions or defaultStatus may be omitted, but not both.",
          minItems: 1,
          uniqueItems: true,
          items: {
            type: "object",
            description:
              "A single version or a range of versions, with vulnerability status.\n\nAn entry with only 'version' and 'status' indicates the status of a single version.\n\nOtherwise, an entry describes a range; it must include the 'versionType' property, to define the version numbering semantics in use, and 'limit', to indicate the non-inclusive upper limit of the range. The object describes the status for versions V such that 'version' <= V and V < 'limit', using the <= and < semantics defined for the specific kind of 'versionType'. Status changes within the range can be specified by an optional 'changes' list.\n\nThe algorithm to decide the status specified for a version V is:\n\n\tfor entry in product.versions {\n\t\tif entry.lessThan is not present and entry.lessThanOrEqual is not present and v == entry.version {\n\t\t\treturn entry.status\n\t\t}\n\t\tif (entry.lessThan is present and entry.version <= v and v < entry.lessThan) or\n\t\t   (entry.lessThanOrEqual is present and entry.version <= v and v <= entry.lessThanOrEqual) { // <= and < defined by entry.versionType\n\t\t\tstatus = entry.status\n\t\t\tfor change in entry.changes {\n\t\t\t\tif change.at <= v {\n\t\t\t\t\tstatus = change.status\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn status\n\t\t}\n\t}\n\treturn product.defaultStatus\n\n.",
            oneOf: [
              {
                required: ["version", "status"],
                maxProperties: 2,
              },
              {
                required: ["version", "status", "versionType"],
                oneOf: [
                  {
                    required: ["lessThan"],
                  },
                  {
                    required: ["lessThanOrEqual"],
                  },
                ],
              },
            ],
            properties: {
              version: {
                description:
                  "The single version being described, or the version at the start of the range. By convention, typically 0 denotes the earliest possible version.",
                $ref: "#/definitions/version",
              },
              status: {
                description:
                  "The vulnerability status for the version or range of versions. For a range, the status may be refined by the 'changes' list.",
                $ref: "#/definitions/status",
              },
              versionType: {
                type: "string",
                description:
                  "The version numbering system used for specifying the range. This defines the exact semantics of the comparison (less-than) operation on versions, which is required to understand the range itself. 'Custom' indicates that the version type is unspecified and should be avoided whenever possible. It is included primarily for use in conversion of older data files.",
                minLength: 1,
                maxLength: 128,
                examples: ["custom", "git", "maven", "python", "rpm", "semver"],
              },
              lessThan: {
                description:
                  "The non-inclusive upper limit of the range. This is the least version NOT in the range. The usual version syntax is expanded to allow a pattern to end in an asterisk `(*)`, indicating an arbitrarily large number in the version ordering. For example, `{version: 1.0 lessThan: 1.*}` would describe the entire 1.X branch for most range kinds, and `{version: 2.0, lessThan: *}` describes all versions starting at 2.0, including 3.0, 5.1, and so on. Only one of lessThan and lessThanOrEqual should be specified.",
                $ref: "#/definitions/version",
              },
              lessThanOrEqual: {
                description:
                  "The inclusive upper limit of the range. This is the greatest version contained in the range. Only one of lessThan and lessThanOrEqual should be specified. For example, `{version: 1.0, lessThanOrEqual: 1.3}` covers all versions from 1.0 up to and including 1.3.",
                $ref: "#/definitions/version",
              },
              changes: {
                type: "array",
                description:
                  "A list of status changes that take place during the range. The array should be sorted in increasing order by the 'at' field, according to the versionType, but clients must re-sort the list themselves rather than assume it is sorted.",
                minItems: 1,
                uniqueItems: true,
                items: {
                  type: "object",
                  description:
                    "The start of a single status change during the range.",
                  required: ["at", "status"],
                  properties: {
                    at: {
                      description:
                        "The version at which a status change occurs.",
                      $ref: "#/definitions/version",
                    },
                    status: {
                      description:
                        "The new status in the range starting at the given version.",
                      $ref: "#/definitions/status",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    dataType: {
      description:
        "Indicates the type of information represented in the JSON instance.",
      type: "string",
      enum: ["CVE_RECORD"],
    },
    dataVersion: {
      description:
        "The version of the schema being used. Used to support multiple versions of this format.",
      type: "string",
      enum: ["5.0"],
    },
    cveMetadataPublished: {
      description:
        "This is meta data about the CVE ID such as the CVE ID, who requested it, who assigned it, when it was requested, the current state (PUBLISHED, REJECTED, etc.) and so on.  These fields are controlled by the CVE Services.",
      type: "object",
      required: ["cveId", "assignerOrgId", "state"],
      properties: {
        cveId: {
          description: "The CVE identifier that this record pertains to.",
          $ref: "#/definitions/cveId",
        },
        assignerOrgId: {
          $ref: "#/definitions/orgId",
          description:
            "The UUID for the organization to which the CVE ID was originally assigned. This UUID can be used to lookup the organization record in the user registry service.",
        },
        assignerShortName: {
          $ref: "#/definitions/shortName",
          description:
            "The short name for the organization to which the CVE ID was originally assigned.",
        },
        requesterUserId: {
          $ref: "#/definitions/userId",
          description: "The user that requested the CVE identifier.",
        },
        dateUpdated: {
          description: "The date/time the record was last updated.",
          $ref: "#/definitions/timestamp",
        },
        serial: {
          type: "integer",
          minimum: 1,
          description:
            "The system of record causes this to start at 1, and increment by 1 each time a submission from a data provider changes this CVE Record. The incremented value moves to the Rejected schema upon a PUBLISHED->REJECTED transition, and moves to the Published schema upon a REJECTED->PUBLISHED transition.",
        },
        dateReserved: {
          $ref: "#/definitions/timestamp",
          description:
            "The date/time this CVE ID was reserved in the CVE automation workgroup services system. Disclaimer: This date reflects when the CVE ID was reserved, and does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE.",
        },
        datePublished: {
          $ref: "#/definitions/timestamp",
          description:
            "The date/time the CVE Record was first published in the CVE List.",
        },
        state: {
          description: "State of CVE - PUBLISHED, REJECTED.",
          type: "string",
          enum: ["PUBLISHED"],
        },
      },
      additionalProperties: false,
    },
    cveMetadataRejected: {
      type: "object",
      description:
        "This is meta data about the CVE ID such as the CVE ID, who requested it, who assigned it, when it was requested, the current state (PUBLISHED, REJECTED, etc.) and so on.  These fields are controlled by the CVE Services.",
      required: ["cveId", "assignerOrgId", "state"],
      properties: {
        cveId: {
          description: "The CVE identifier that this record pertains to.",
          $ref: "#/definitions/cveId",
        },
        assignerOrgId: {
          $ref: "#/definitions/orgId",
          description:
            "The UUID for the organization to which the CVE ID was originally assigned.",
        },
        assignerShortName: {
          $ref: "#/definitions/shortName",
          description:
            "The short name for the organization to which the CVE ID was originally assigned.",
        },
        serial: {
          type: "integer",
          minimum: 1,
          description:
            "The system of record causes this to start at 1, and increment by 1 each time a submission from a data provider changes this CVE Record. The incremented value moves to the Rejected schema upon a PUBLISHED->REJECTED transition, and moves to the Published schema upon a REJECTED->PUBLISHED transition.",
        },
        dateUpdated: {
          description: "The date/time the record was last updated.",
          $ref: "#/definitions/timestamp",
        },
        datePublished: {
          $ref: "#/definitions/timestamp",
          description:
            "The date/time the CVE Record was first published in the CVE List.",
        },
        dateRejected: {
          $ref: "#/definitions/timestamp",
          description: "The date/time the CVE ID was rejected.",
        },
        state: {
          type: "string",
          description: "State of CVE - PUBLISHED, REJECTED.",
          enum: ["REJECTED"],
        },
        dateReserved: {
          $ref: "#/definitions/timestamp",
          description:
            "The date/time this CVE ID was reserved in the CVE automation workgroup services system. Disclaimer: This date reflects when the CVE ID was reserved, and does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE.",
        },
      },
      additionalProperties: false,
    },
    providerMetadata: {
      type: "object",
      description:
        "Details related to the information container provider (CNA or ADP).",
      properties: {
        orgId: {
          $ref: "#/definitions/orgId",
          description: "The container provider's organizational UUID.",
        },
        shortName: {
          $ref: "#/definitions/shortName",
          description: "The container provider's organizational short name.",
        },
        dateUpdated: {
          $ref: "#/definitions/timestamp",
          description:
            "Timestamp to be set by the system of record at time of submission. If dateUpdated is provided to the system of record it will be replaced by the current timestamp at the time of submission.",
        },
      },
      required: ["orgId"],
    },
    cnaPublishedContainer: {
      description:
        "An object containing the vulnerability information provided by a CVE Numbering Authority (CNA) for a published CVE ID. There can only be one CNA container per CVE record since there can only be one assigning CNA. The CNA container must include the required information defined in the CVE Rules, which includes a product, version, problem type, prose description, and a reference.",
      type: "object",
      properties: {
        providerMetadata: {
          $ref: "#/definitions/providerMetadata",
        },
        dateAssigned: {
          $ref: "#/definitions/timestamp",
          description:
            "The date/time this CVE ID was associated with a vulnerability by a CNA.",
        },
        datePublic: {
          $ref: "#/definitions/timestamp",
          description:
            "If known, the date/time the vulnerability was disclosed publicly.",
        },
        title: {
          type: "string",
          description:
            "A title, headline, or a brief phrase summarizing the CVE record. Eg., Buffer overflow in Example Soft.",
          minLength: 1,
          maxLength: 256,
        },
        descriptions: {
          $ref: "#/definitions/descriptions",
        },
        affected: {
          $ref: "#/definitions/affected",
        },
        problemTypes: {
          $ref: "#/definitions/problemTypes",
        },
        references: {
          $ref: "#/definitions/references",
        },
        impacts: {
          $ref: "#/definitions/impacts",
        },
        metrics: {
          $ref: "#/definitions/metrics",
        },
        configurations: {
          $ref: "#/definitions/configurations",
        },
        workarounds: {
          $ref: "#/definitions/workarounds",
        },
        solutions: {
          $ref: "#/definitions/solutions",
        },
        exploits: {
          $ref: "#/definitions/exploits",
        },
        timeline: {
          $ref: "#/definitions/timeline",
        },
        credits: {
          $ref: "#/definitions/credits",
        },
        source: {
          $ref: "#/definitions/source",
        },
        tags: {
          $ref: "#/definitions/cnaTags",
        },
        taxonomyMappings: {
          $ref: "#/definitions/taxonomyMappings",
        },
      },
      required: ["providerMetadata", "descriptions", "affected", "references"],
      patternProperties: {
        "^x_[^.]*$": {},
      },
      additionalProperties: false,
    },
    cnaRejectedContainer: {
      description:
        "An object containing the vulnerability information provided by a CVE Numbering Authority (CNA) for a rejected CVE ID. There can only be one CNA container per CVE record since there can only be one assigning CNA.",
      type: "object",
      properties: {
        providerMetadata: {
          $ref: "#/definitions/providerMetadata",
        },
        rejectedReasons: {
          description: "Reasons for rejecting this CVE Record.",
          $ref: "#/definitions/descriptions",
        },
        replacedBy: {
          type: "array",
          description:
            "Contains an array of CVE IDs that this CVE ID was rejected in favor of because this CVE ID was assigned to the vulnerabilities.",
          minItems: 1,
          uniqueItems: true,
          items: {
            $ref: "#/definitions/cveId",
          },
        },
      },
      required: ["providerMetadata", "rejectedReasons"],
      patternProperties: {
        "^x_[^.]*$": {},
      },
      additionalProperties: false,
    },
    adpContainer: {
      description:
        "An object containing the vulnerability information provided by an Authorized Data Publisher (ADP). Since multiple ADPs can provide information for a CVE ID, an ADP container must indicate which ADP is the source of the information in the object.",
      type: "object",
      properties: {
        providerMetadata: {
          $ref: "#/definitions/providerMetadata",
        },
        datePublic: {
          $ref: "#/definitions/timestamp",
          description:
            "If known, the date/time the vulnerability was disclosed publicly.",
        },
        title: {
          type: "string",
          description:
            "A title, headline, or a brief phrase summarizing the information in an ADP container.",
          minLength: 1,
          maxLength: 256,
        },
        descriptions: {
          $ref: "#/definitions/descriptions",
        },
        affected: {
          $ref: "#/definitions/affected",
        },
        problemTypes: {
          $ref: "#/definitions/problemTypes",
        },
        references: {
          $ref: "#/definitions/references",
        },
        impacts: {
          $ref: "#/definitions/impacts",
        },
        metrics: {
          $ref: "#/definitions/metrics",
        },
        configurations: {
          $ref: "#/definitions/configurations",
        },
        workarounds: {
          $ref: "#/definitions/workarounds",
        },
        solutions: {
          $ref: "#/definitions/solutions",
        },
        exploits: {
          $ref: "#/definitions/exploits",
        },
        timeline: {
          $ref: "#/definitions/timeline",
        },
        credits: {
          $ref: "#/definitions/credits",
        },
        source: {
          $ref: "#/definitions/source",
        },
        tags: {
          $ref: "#/definitions/adpTags",
        },
        taxonomyMappings: {
          $ref: "#/definitions/taxonomyMappings",
        },
      },
      required: ["providerMetadata"],
      minProperties: 2,
      patternProperties: {
        "^x_[^.]*$": {},
      },
      additionalProperties: false,
    },
    affected: {
      type: "array",
      description: "List of affected products.",
      minItems: 1,
      items: {
        $ref: "#/definitions/product",
      },
    },
    description: {
      type: "object",
      description:
        "Text in a particular language with optional alternate markup or formatted representation (e.g., Markdown) or embedded media.",
      properties: {
        lang: {
          $ref: "#/definitions/language",
        },
        value: {
          type: "string",
          description: "Plain text description.",
          minLength: 1,
          maxLength: 4096,
        },
        supportingMedia: {
          type: "array",
          title: "Supporting media",
          description:
            "Supporting media data for the description such as markdown, diagrams, .. (optional). Similar to RFC 2397 each media object has three main parts: media type, media data value, and an optional boolean flag to indicate if the media data is base64 encoded.",
          uniqueItems: true,
          minItems: 1,
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                title: "Media type",
                minLength: 1,
                maxLength: 256,
                description:
                  "RFC2046 compliant IANA Media type for eg., text/markdown, text/html.",
                examples: [
                  "text/markdown",
                  "text/html",
                  "image/png",
                  "image/svg",
                  "audio/mp3",
                ],
              },
              base64: {
                type: "boolean",
                title: "Encoding",
                description:
                  "If true then the value field contains the media data encoded in base64. If false then the value field contains the UTF-8 media content.",
                default: false,
              },
              value: {
                type: "string",
                description:
                  "Supporting media content, up to 16K. If base64 is true, this field stores base64 encoded data.",
                minLength: 1,
                maxLength: 16384,
              },
            },
            required: ["type", "value"],
          },
        },
      },
      required: ["lang", "value"],
      additionalProperties: false,
    },
    englishLanguageDescription: {
      type: "object",
      description:
        "A description with lang set to an English language (en, en_US, en_UK, and so on).",
      properties: {
        lang: {
          $ref: "#/definitions/englishLanguage",
        },
      },
      required: ["lang"],
    },
    descriptions: {
      type: "array",
      description:
        "A list of multi-lingual descriptions of the vulnerability. E.g., [PROBLEMTYPE] in [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] on [PLATFORMS] allows [ATTACKER] to [IMPACT] via [VECTOR]. OR [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] [ROOT CAUSE], which allows [ATTACKER] to [IMPACT] via [VECTOR].",
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: "#/definitions/description",
      },
      contains: {
        $ref: "#/definitions/englishLanguageDescription",
      },
    },
    problemTypes: {
      type: "array",
      description:
        "This is problem type information (e.g. CWE identifier). Must contain: At least one entry, can be text, OWASP, CWE, please note that while only one is required you can use more than one (or indeed all three) as long as they are correct). (CNA requirement: [PROBLEMTYPE]).",
      items: {
        type: "object",
        required: ["descriptions"],
        properties: {
          descriptions: {
            type: "array",
            items: {
              type: "object",
              required: ["lang", "description"],
              properties: {
                lang: {
                  $ref: "#/definitions/language",
                },
                description: {
                  type: "string",
                  description:
                    "Text description of problemType, or title from CWE or OWASP.",
                  minLength: 1,
                  maxLength: 4096,
                },
                cweId: {
                  type: "string",
                  description:
                    "CWE ID of the CWE that best describes this problemType entry.",
                  minLength: 5,
                  maxLength: 9,
                  pattern: "^CWE-[1-9][0-9]*$",
                },
                type: {
                  type: "string",
                  description: "Problemtype source, text, OWASP, CWE, etc.,",
                  minLength: 1,
                  maxLength: 128,
                },
                references: {
                  $ref: "#/definitions/references",
                },
              },
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
      },
      minItems: 1,
      uniqueItems: true,
    },
    references: {
      type: "array",
      description:
        'This is reference data in the form of URLs or file objects (uuencoded and embedded within the JSON file, exact format to be decided, e.g. we may require a compressed format so the objects require unpacking before they are "dangerous").',
      items: {
        $ref: "#/definitions/reference",
      },
      minItems: 1,
      maxItems: 512,
      uniqueItems: true,
    },
    impacts: {
      type: "array",
      description: "Collection of impacts of this vulnerability.",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "object",
        description:
          "This is impact type information (e.g. a text description.",
        required: ["descriptions"],
        properties: {
          capecId: {
            type: "string",
            description: "CAPEC ID that best relates to this impact.",
            minLength: 7,
            maxLength: 11,
            pattern: "^CAPEC-[1-9][0-9]{0,4}$",
          },
          descriptions: {
            description:
              "Prose description of the impact scenario. At a minimum provide the description given by CAPEC.",
            $ref: "#/definitions/descriptions",
          },
        },
      },
    },
    metrics: {
      type: "array",
      description: "Collection of impact scores with attribution.",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "object",
        description:
          "This is impact type information (e.g. a text description, CVSSv2, CVSSv3, etc.). Must contain: At least one entry, can be text, CVSSv2, CVSSv3, others may be added.",
        anyOf: [
          {
            required: ["cvssV3_1"],
          },
          {
            required: ["cvssV3_0"],
          },
          {
            required: ["cvssV2_0"],
          },
          {
            required: ["other"],
          },
        ],
        properties: {
          format: {
            type: "string",
            description:
              "Name of the scoring format. This provides a bit of future proofing. Additional properties are not prohibited, so this will support the inclusion of proprietary formats. It also provides an easy future conversion mechanism when future score formats become part of the schema. example: cvssV44, format = 'cvssV44', other = cvssV4_4 JSON object. In the future, the other properties can be converted to score properties when they become part of the schema.",
            minLength: 1,
            maxLength: 64,
          },
          scenarios: {
            type: "array",
            description:
              "Description of the scenarios this metrics object applies to. If no specific scenario is given, GENERAL is used as the default and applies when no more specific metric matches.",
            minItems: 1,
            uniqueItems: true,
            items: {
              type: "object",
              properties: {
                lang: {
                  $ref: "#/definitions/language",
                },
                value: {
                  type: "string",
                  default: "GENERAL",
                  description:
                    "Description of the scenario this metrics object applies to. If no specific scenario is given, GENERAL is used as the default and applies when no more specific metric matches.",
                  minLength: 1,
                  maxLength: 4096,
                },
              },
              required: ["lang", "value"],
            },
          },
          cvssV3_1: {
            $schema: "http://json-schema.org/draft-07/schema#",
            title:
              "JSON Schema for Common Vulnerability Scoring System version 3.1",
            type: "object",
            definitions: {
              attackVectorType: {
                type: "string",
                enum: ["NETWORK", "ADJACENT_NETWORK", "LOCAL", "PHYSICAL"],
              },
              modifiedAttackVectorType: {
                type: "string",
                enum: [
                  "NETWORK",
                  "ADJACENT_NETWORK",
                  "LOCAL",
                  "PHYSICAL",
                  "NOT_DEFINED",
                ],
              },
              attackComplexityType: {
                type: "string",
                enum: ["HIGH", "LOW"],
              },
              modifiedAttackComplexityType: {
                type: "string",
                enum: ["HIGH", "LOW", "NOT_DEFINED"],
              },
              privilegesRequiredType: {
                type: "string",
                enum: ["HIGH", "LOW", "NONE"],
              },
              modifiedPrivilegesRequiredType: {
                type: "string",
                enum: ["HIGH", "LOW", "NONE", "NOT_DEFINED"],
              },
              userInteractionType: {
                type: "string",
                enum: ["NONE", "REQUIRED"],
              },
              modifiedUserInteractionType: {
                type: "string",
                enum: ["NONE", "REQUIRED", "NOT_DEFINED"],
              },
              scopeType: {
                type: "string",
                enum: ["UNCHANGED", "CHANGED"],
              },
              modifiedScopeType: {
                type: "string",
                enum: ["UNCHANGED", "CHANGED", "NOT_DEFINED"],
              },
              ciaType: {
                type: "string",
                enum: ["NONE", "LOW", "HIGH"],
              },
              modifiedCiaType: {
                type: "string",
                enum: ["NONE", "LOW", "HIGH", "NOT_DEFINED"],
              },
              exploitCodeMaturityType: {
                type: "string",
                enum: [
                  "UNPROVEN",
                  "PROOF_OF_CONCEPT",
                  "FUNCTIONAL",
                  "HIGH",
                  "NOT_DEFINED",
                ],
              },
              remediationLevelType: {
                type: "string",
                enum: [
                  "OFFICIAL_FIX",
                  "TEMPORARY_FIX",
                  "WORKAROUND",
                  "UNAVAILABLE",
                  "NOT_DEFINED",
                ],
              },
              confidenceType: {
                type: "string",
                enum: ["UNKNOWN", "REASONABLE", "CONFIRMED", "NOT_DEFINED"],
              },
              ciaRequirementType: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "NOT_DEFINED"],
              },
              scoreType: {
                type: "number",
                minimum: 0,
                maximum: 10,
              },
              severityType: {
                type: "string",
                enum: ["NONE", "LOW", "MEDIUM", "HIGH", "CRITICAL"],
              },
            },
            properties: {
              version: {
                description: "CVSS Version",
                type: "string",
                enum: ["3.1"],
              },
              vectorString: {
                type: "string",
                pattern:
                  "^CVSS:3[.]1/((AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$",
              },
              attackVector: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/attackVectorType",
              },
              attackComplexity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/attackComplexityType",
              },
              privilegesRequired: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/privilegesRequiredType",
              },
              userInteraction: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/userInteractionType",
              },
              scope: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/scopeType",
              },
              confidentialityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/ciaType",
              },
              integrityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/ciaType",
              },
              availabilityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/ciaType",
              },
              baseScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/scoreType",
              },
              baseSeverity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/severityType",
              },
              exploitCodeMaturity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/exploitCodeMaturityType",
              },
              remediationLevel: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/remediationLevelType",
              },
              reportConfidence: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/confidenceType",
              },
              temporalScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/scoreType",
              },
              temporalSeverity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/severityType",
              },
              confidentialityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/ciaRequirementType",
              },
              integrityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/ciaRequirementType",
              },
              availabilityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/ciaRequirementType",
              },
              modifiedAttackVector: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedAttackVectorType",
              },
              modifiedAttackComplexity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedAttackComplexityType",
              },
              modifiedPrivilegesRequired: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedPrivilegesRequiredType",
              },
              modifiedUserInteraction: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedUserInteractionType",
              },
              modifiedScope: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedScopeType",
              },
              modifiedConfidentialityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedCiaType",
              },
              modifiedIntegrityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedCiaType",
              },
              modifiedAvailabilityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/modifiedCiaType",
              },
              environmentalScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/scoreType",
              },
              environmentalSeverity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_1/definitions/severityType",
              },
            },
            required: ["version", "vectorString", "baseScore", "baseSeverity"],
          },
          cvssV3_0: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title:
              "JSON Schema for Common Vulnerability Scoring System version 3.0",
            type: "object",
            definitions: {
              attackVectorType: {
                type: "string",
                enum: ["NETWORK", "ADJACENT_NETWORK", "LOCAL", "PHYSICAL"],
              },
              modifiedAttackVectorType: {
                type: "string",
                enum: [
                  "NETWORK",
                  "ADJACENT_NETWORK",
                  "LOCAL",
                  "PHYSICAL",
                  "NOT_DEFINED",
                ],
              },
              attackComplexityType: {
                type: "string",
                enum: ["HIGH", "LOW"],
              },
              modifiedAttackComplexityType: {
                type: "string",
                enum: ["HIGH", "LOW", "NOT_DEFINED"],
              },
              privilegesRequiredType: {
                type: "string",
                enum: ["HIGH", "LOW", "NONE"],
              },
              modifiedPrivilegesRequiredType: {
                type: "string",
                enum: ["HIGH", "LOW", "NONE", "NOT_DEFINED"],
              },
              userInteractionType: {
                type: "string",
                enum: ["NONE", "REQUIRED"],
              },
              modifiedUserInteractionType: {
                type: "string",
                enum: ["NONE", "REQUIRED", "NOT_DEFINED"],
              },
              scopeType: {
                type: "string",
                enum: ["UNCHANGED", "CHANGED"],
              },
              modifiedScopeType: {
                type: "string",
                enum: ["UNCHANGED", "CHANGED", "NOT_DEFINED"],
              },
              ciaType: {
                type: "string",
                enum: ["NONE", "LOW", "HIGH"],
              },
              modifiedCiaType: {
                type: "string",
                enum: ["NONE", "LOW", "HIGH", "NOT_DEFINED"],
              },
              exploitCodeMaturityType: {
                type: "string",
                enum: [
                  "UNPROVEN",
                  "PROOF_OF_CONCEPT",
                  "FUNCTIONAL",
                  "HIGH",
                  "NOT_DEFINED",
                ],
              },
              remediationLevelType: {
                type: "string",
                enum: [
                  "OFFICIAL_FIX",
                  "TEMPORARY_FIX",
                  "WORKAROUND",
                  "UNAVAILABLE",
                  "NOT_DEFINED",
                ],
              },
              confidenceType: {
                type: "string",
                enum: ["UNKNOWN", "REASONABLE", "CONFIRMED", "NOT_DEFINED"],
              },
              ciaRequirementType: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "NOT_DEFINED"],
              },
              scoreType: {
                type: "number",
                minimum: 0,
                maximum: 10,
              },
              severityType: {
                type: "string",
                enum: ["NONE", "LOW", "MEDIUM", "HIGH", "CRITICAL"],
              },
            },
            properties: {
              version: {
                description: "CVSS Version",
                type: "string",
                enum: ["3.0"],
              },
              vectorString: {
                type: "string",
                pattern:
                  "^CVSS:3[.]0/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$",
              },
              attackVector: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/attackVectorType",
              },
              attackComplexity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/attackComplexityType",
              },
              privilegesRequired: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/privilegesRequiredType",
              },
              userInteraction: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/userInteractionType",
              },
              scope: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/scopeType",
              },
              confidentialityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/ciaType",
              },
              integrityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/ciaType",
              },
              availabilityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/ciaType",
              },
              baseScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/scoreType",
              },
              baseSeverity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/severityType",
              },
              exploitCodeMaturity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/exploitCodeMaturityType",
              },
              remediationLevel: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/remediationLevelType",
              },
              reportConfidence: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/confidenceType",
              },
              temporalScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/scoreType",
              },
              temporalSeverity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/severityType",
              },
              confidentialityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/ciaRequirementType",
              },
              integrityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/ciaRequirementType",
              },
              availabilityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/ciaRequirementType",
              },
              modifiedAttackVector: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedAttackVectorType",
              },
              modifiedAttackComplexity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedAttackComplexityType",
              },
              modifiedPrivilegesRequired: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedPrivilegesRequiredType",
              },
              modifiedUserInteraction: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedUserInteractionType",
              },
              modifiedScope: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedScopeType",
              },
              modifiedConfidentialityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedCiaType",
              },
              modifiedIntegrityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedCiaType",
              },
              modifiedAvailabilityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/modifiedCiaType",
              },
              environmentalScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/scoreType",
              },
              environmentalSeverity: {
                $ref: "#/definitions/metrics/items/properties/cvssV3_0/definitions/severityType",
              },
            },
            required: ["version", "vectorString", "baseScore", "baseSeverity"],
          },
          cvssV2_0: {
            $schema: "http://json-schema.org/draft-04/schema#",
            title:
              "JSON Schema for Common Vulnerability Scoring System version 2.0",
            type: "object",
            definitions: {
              accessVectorType: {
                type: "string",
                enum: ["NETWORK", "ADJACENT_NETWORK", "LOCAL"],
              },
              accessComplexityType: {
                type: "string",
                enum: ["HIGH", "MEDIUM", "LOW"],
              },
              authenticationType: {
                type: "string",
                enum: ["MULTIPLE", "SINGLE", "NONE"],
              },
              ciaType: {
                type: "string",
                enum: ["NONE", "PARTIAL", "COMPLETE"],
              },
              exploitabilityType: {
                type: "string",
                enum: [
                  "UNPROVEN",
                  "PROOF_OF_CONCEPT",
                  "FUNCTIONAL",
                  "HIGH",
                  "NOT_DEFINED",
                ],
              },
              remediationLevelType: {
                type: "string",
                enum: [
                  "OFFICIAL_FIX",
                  "TEMPORARY_FIX",
                  "WORKAROUND",
                  "UNAVAILABLE",
                  "NOT_DEFINED",
                ],
              },
              reportConfidenceType: {
                type: "string",
                enum: [
                  "UNCONFIRMED",
                  "UNCORROBORATED",
                  "CONFIRMED",
                  "NOT_DEFINED",
                ],
              },
              collateralDamagePotentialType: {
                type: "string",
                enum: [
                  "NONE",
                  "LOW",
                  "LOW_MEDIUM",
                  "MEDIUM_HIGH",
                  "HIGH",
                  "NOT_DEFINED",
                ],
              },
              targetDistributionType: {
                type: "string",
                enum: ["NONE", "LOW", "MEDIUM", "HIGH", "NOT_DEFINED"],
              },
              ciaRequirementType: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "NOT_DEFINED"],
              },
              scoreType: {
                type: "number",
                minimum: 0,
                maximum: 10,
              },
            },
            properties: {
              version: {
                description: "CVSS Version",
                type: "string",
                enum: ["2.0"],
              },
              vectorString: {
                type: "string",
                pattern:
                  "^((AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))/)*(AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))$",
              },
              accessVector: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/accessVectorType",
              },
              accessComplexity: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/accessComplexityType",
              },
              authentication: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/authenticationType",
              },
              confidentialityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/ciaType",
              },
              integrityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/ciaType",
              },
              availabilityImpact: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/ciaType",
              },
              baseScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/scoreType",
              },
              exploitability: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/exploitabilityType",
              },
              remediationLevel: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/remediationLevelType",
              },
              reportConfidence: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/reportConfidenceType",
              },
              temporalScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/scoreType",
              },
              collateralDamagePotential: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/collateralDamagePotentialType",
              },
              targetDistribution: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/targetDistributionType",
              },
              confidentialityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/ciaRequirementType",
              },
              integrityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/ciaRequirementType",
              },
              availabilityRequirement: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/ciaRequirementType",
              },
              environmentalScore: {
                $ref: "#/definitions/metrics/items/properties/cvssV2_0/definitions/scoreType",
              },
            },
            required: ["version", "vectorString", "baseScore"],
          },
          other: {
            type: "object",
            description:
              "A non-standard impact description, may be prose or JSON block.",
            required: ["type", "content"],
            properties: {
              type: {
                description:
                  "Name of the non-standard impact metrics format used.",
                type: "string",
                minLength: 1,
                maxLength: 128,
              },
              content: {
                type: "object",
                description:
                  "JSON object not covered by another metrics format.",
                minProperties: 1,
              },
            },
          },
        },
      },
    },
    configurations: {
      type: "array",
      description: "Configurations required for exploiting this vulnerability.",
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: "#/definitions/description",
      },
    },
    workarounds: {
      type: "array",
      description: "Workarounds and mitigations for this vulnerability.",
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: "#/definitions/description",
      },
    },
    solutions: {
      type: "array",
      description:
        "Information about solutions or remediations available for this vulnerability.",
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: "#/definitions/description",
      },
    },
    exploits: {
      type: "array",
      description: "Information about exploits of the vulnerability.",
      minItems: 1,
      uniqueItems: true,
      items: {
        $ref: "#/definitions/description",
      },
    },
    timeline: {
      type: "array",
      description:
        "This is timeline information for significant events about this vulnerability or changes to the CVE Record.",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "object",
        required: ["time", "lang", "value"],
        properties: {
          time: {
            description:
              "Timestamp representing when the event in the timeline occurred. The timestamp format is based on RFC3339 and ISO ISO8601, with an optional timezone. yyyy-MM-ddTHH:mm:ssZZZZ - if the timezone offset is not given, GMT (0000) is assumed.",
            $ref: "#/definitions/timestamp",
          },
          lang: {
            description:
              "The language used in the description of the event. The language field is included so that CVE Records can support translations. The value must be a BCP 47 language code.",
            $ref: "#/definitions/language",
          },
          value: {
            description: "A summary of the event.",
            type: "string",
            minLength: 1,
            maxLength: 4096,
          },
        },
      },
    },
    credits: {
      type: "array",
      description:
        "Statements acknowledging specific people, organizations, or tools recognizing the work done in researching, discovering, remediating or helping with activities related to this CVE.",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "object",
        properties: {
          lang: {
            description:
              "The language used when describing the credits. The language field is included so that CVE Records can support translations. The value must be a BCP 47 language code.",
            $ref: "#/definitions/language",
          },
          value: {
            type: "string",
            minLength: 1,
            maxLength: 4096,
          },
          user: {
            description:
              "UUID of the user being credited if present in the CVE User Registry (optional). This UUID can be used to lookup the user record in the user registry service.",
            $ref: "#/definitions/uuidType",
          },
          type: {
            type: "string",
            description:
              "Type or role of the entity being credited (optional). finder: identifies the vulnerability.\nreporter: notifies the vendor of the vulnerability to a CNA.\nanalyst: validates the vulnerability to ensure accuracy or severity.\ncoordinator: facilitates the coordinated response process.\nremediation developer: prepares a code change or other remediation plans.\nremediation reviewer: reviews vulnerability remediation plans or code changes for effectiveness and completeness.\nremediation verifier: tests and verifies the vulnerability or its remediation.\ntool: names of tools used in vulnerability discovery or identification.\nsponsor: supports the vulnerability identification or remediation activities.",
            default: "finder",
            enum: [
              "finder",
              "reporter",
              "analyst",
              "coordinator",
              "remediation developer",
              "remediation reviewer",
              "remediation verifier",
              "tool",
              "sponsor",
              "other",
            ],
          },
        },
        required: ["lang", "value"],
      },
    },
    source: {
      type: "object",
      description:
        "This is the source information (who discovered it, who researched it, etc.) and optionally a chain of CNA information (e.g. the originating CNA and subsequent parent CNAs who have processed it before it arrives at the MITRE root).\n Must contain: IF this is in the root level it MUST contain a CNA_chain entry, IF this source entry is NOT in the root (e.g. it is part of a vendor statement) then it must contain at least one type of data entry.",
      minProperties: 1,
    },
    language: {
      type: "string",
      description: "BCP 47 language code, language-region.",
      default: "en",
      pattern: "^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$",
    },
    englishLanguage: {
      type: "string",
      description:
        "BCP 47 language code, language-region, required to be English.",
      pattern: "^en([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$",
    },
    taxonomyMappings: {
      type: "array",
      description: "List of taxonomy items related to the vulnerability.",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "object",
        description: "",
        required: ["taxonomyName", "taxonomyRelations"],
        properties: {
          taxonomyName: {
            type: "string",
            description: "The name of the taxonomy.",
            minLength: 1,
            maxLength: 128,
          },
          taxonomyVersion: {
            type: "string",
            description: "The version of taxonomy the identifiers come from.",
            minLength: 1,
            maxLength: 128,
          },
          taxonomyRelations: {
            type: "array",
            description: "",
            minItems: 1,
            uniqueItems: true,
            items: {
              type: "object",
              description:
                "List of relationships to the taxonomy for the vulnerability.  Relationships can be between the taxonomy and the CVE or two taxonomy items.",
              required: ["taxonomyId", "relationshipName", "relationshipValue"],
              properties: {
                taxonomyId: {
                  type: "string",
                  description:
                    "Identifier of the item in the taxonomy.  Used as the subject of the relationship.",
                  minLength: 1,
                  maxLength: 2048,
                },
                relationshipName: {
                  type: "string",
                  description: "A description of the relationship.",
                  minLength: 1,
                  maxLength: 128,
                },
                relationshipValue: {
                  type: "string",
                  description:
                    "The target of the relationship.  Can be the CVE ID or another taxonomy identifier.",
                  minLength: 1,
                  maxLength: 2048,
                },
              },
            },
          },
        },
      },
    },
    tagExtension: {
      type: "string",
      minLength: 2,
      maxLength: 128,
      pattern: "^x_.*$",
    },
    cnaTags: {
      type: "array",
      description: "Tags provided by a CNA describing the CVE Record.",
      uniqueItems: true,
      minItems: 1,
      items: {
        oneOf: [
          {
            $ref: "#/definitions/tagExtension",
          },
          {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "https://cve.mitre.org/cve/v5_00/tags/cna/",
            type: "string",
            description:
              "exclusively-hosted-service: All known software and/or hardware affected by this CVE Record is known to exist only in the affected hosted service. If the vulnerability affects both hosted and on-prem software and/or hardware, then the tag should not be used.\n\nunsupported-when-assigned: Used by the assigning CNA to indicate that when a request for a CVE assignment was received, the product was already end-of-life (EOL) or a product or specific version was deemed not to be supported by the vendor. This tag should only be applied to a CVE Record when all affected products or version lines referenced in the CVE-Record are EOL.\n\ndisputed: When one party disagrees with another party's assertion that a particular issue in software is a vulnerability, a CVE Record assigned to that issue may be tagged as being 'disputed'.",
            enum: [
              "unsupported-when-assigned",
              "exclusively-hosted-service",
              "disputed",
            ],
          },
        ],
      },
    },
    adpTags: {
      type: "array",
      description: "Tags provided by an ADP describing the CVE Record.",
      uniqueItems: true,
      minItems: 1,
      items: {
        oneOf: [
          {
            $ref: "#/definitions/tagExtension",
          },
          {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "https://cve.mitre.org/cve/v5_00/tags/adp/",
            type: "string",
            description:
              "disputed: When one party disagrees with another party's assertion that a particular issue in software is a vulnerability, a CVE Record assigned to that issue may be tagged as being 'disputed'.",
            enum: ["disputed"],
          },
        ],
      },
    },
  },
  oneOf: [
    {
      title: "Published",
      description:
        "When a CNA populates the data associated with a CVE ID as a CVE Record, the state of the CVE Record is Published.",
      properties: {
        dataType: {
          $ref: "#/definitions/dataType",
        },
        dataVersion: {
          $ref: "#/definitions/dataVersion",
        },
        cveMetadata: {
          $ref: "#/definitions/cveMetadataPublished",
        },
        containers: {
          description:
            "A set of structures (called containers) used to store vulnerability information related to a specific CVE ID provided by a specific organization participating in the CVE program. Each container includes information provided by a different source.\n\nAt a minimum, a 'cna' container containing the vulnerability information provided by the CNA who initially assigned the CVE ID must be included.\n\nThere can only be one 'cna' container, as there can only be one assigning CNA. However, there can be multiple 'adp' containers, allowing multiple organizations participating in the CVE program to add additional information related to the vulnerability. For the most part, the 'cna' and 'adp' containers contain the same properties. The main differences are the source of the information. The 'cna' container requires the CNA to include certain fields, while the 'adp' container does not.",
          type: "object",
          properties: {
            cna: {
              $ref: "#/definitions/cnaPublishedContainer",
            },
            adp: {
              type: "array",
              items: {
                $ref: "#/definitions/adpContainer",
              },
              minItems: 1,
              uniqueItems: true,
            },
          },
          required: ["cna"],
          additionalProperties: false,
        },
      },
      required: ["dataType", "dataVersion", "cveMetadata", "containers"],
      additionalProperties: false,
    },
    {
      title: "Rejected",
      description:
        "If the CVE ID and associated CVE Record should no longer be used, the CVE Record is placed in the Rejected state. A Rejected CVE Record remains on the CVE List so that users can know when it is invalid.",
      properties: {
        dataType: {
          $ref: "#/definitions/dataType",
        },
        dataVersion: {
          $ref: "#/definitions/dataVersion",
        },
        cveMetadata: {
          $ref: "#/definitions/cveMetadataRejected",
        },
        containers: {
          description:
            "A set of structures (called containers) used to store vulnerability information related to a specific CVE ID provided by a specific organization participating in the CVE program. Each container includes information provided by a different source.\n\nAt minimum, a 'cna' container containing the vulnerability information provided by the CNA who initially assigned the CVE ID must be included.\n\nThere can only be one 'cna' container, as there can only be one assigning CNA.",
          type: "object",
          properties: {
            cna: {
              $ref: "#/definitions/cnaRejectedContainer",
            },
          },
          required: ["cna"],
          additionalProperties: false,
        },
      },
      required: ["dataType", "dataVersion", "cveMetadata", "containers"],
      additionalProperties: false,
    },
  ],
};
