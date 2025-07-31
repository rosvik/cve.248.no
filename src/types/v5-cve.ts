import { z } from "zod";
import { OpenGraphData } from "../utils/opengraph";

/**
 * Indicates the type of information represented in the JSON instance.
 */
export const DataType = z.literal("CVE_RECORD");
export type DataType = z.infer<typeof DataType>;

/**
 * The version of the schema being used. Used to support multiple versions of this format.
 */
export const DataVersion = z.string();
export type DataVersion = z.infer<typeof DataVersion>;

/**
 * BCP 47 language code, language-region.
 */
export const Language = z.string();
export type Language = z.infer<typeof Language>;

/**
 * RFC2046 compliant IANA Media type for eg., text/markdown, text/html.
 */
export const MediaType = z.string();
export type MediaType = z.infer<typeof MediaType>;

/**
 * If true then the value field contains the media data encoded in base64. If false then the value field contains the UTF-8 media content.
 */
export const Encoding = z.boolean();
export type Encoding = z.infer<typeof Encoding>;

/**
 * Common Platform Enumeration (CPE) Name in either 2.2 or 2.3 format
 */
export const CPEName = z.string();
export type CPEName = z.infer<typeof CPEName>;

/**
 * List of specific platforms if the vulnerability is only relevant in the context of these platforms (optional). Platforms may include execution environments, operating systems, virtualization technologies, hardware models, or computing architectures. The lack of this field or an empty array implies that the other fields are applicable to all relevant platforms.
 *
 * @minItems 1
 */
export const Platforms = z.array(z.string());
export type Platforms = z.infer<typeof Platforms>;

export const TagExtension = z.string();
export type TagExtension = z.infer<typeof TagExtension>;

/**
 * broken-link: The reference link is returning a 404 error, or the site is no longer online.
 *
 * customer-entitlement: Similar to Privileges Required, but specific to references that require non-public/paid access for customers of the particular vendor.
 *
 * exploit: Reference contains an in-depth/detailed description of steps to exploit a vulnerability OR the reference contains any legitimate Proof of Concept (PoC) code or exploit kit.
 *
 * government-resource: All reference links that are from a government agency or organization should be given the Government Resource tag.
 *
 * issue-tracking: The reference is a post from a bug tracking tool such as MantisBT, Bugzilla, JIRA, Github Issues, etc...
 *
 * mailing-list: The reference is from a mailing list -- often specific to a product or vendor.
 *
 * mitigation: The reference contains information on steps to mitigate against the vulnerability in the event a patch can't be applied or is unavailable or for EOL product situations.
 *
 * not-applicable: The reference link is not applicable to the vulnerability and was likely associated by MITRE accidentally (should be used sparingly).
 *
 * patch: The reference contains an update to the software that fixes the vulnerability.
 *
 * permissions-required: The reference link provided is blocked by a logon page. If credentials are required to see any information this tag must be applied.
 *
 * media-coverage: The reference is from a media outlet such as a newspaper, magazine, social media, or weblog. This tag is not intended to apply to any individual's personal social media account. It is strictly intended for public media entities.
 *
 * product: A reference appropriate for describing a product for the purpose of CPE or SWID.
 *
 * related: A reference that is for a related (but not the same) vulnerability.
 *
 * release-notes: The reference is in the format of a vendor or open source project's release notes or change log.
 *
 * signature: The reference contains a method to detect or prevent the presence or exploitation of the vulnerability.
 *
 * technical-description: The reference contains in-depth technical information about a vulnerability and its exploitation process, typically in the form of a presentation or whitepaper.
 *
 * third-party-advisory: Advisory is from an organization that is not the vulnerable product's vendor/publisher/maintainer.
 *
 * vendor-advisory: Advisory is from the vendor/publisher/maintainer of the product or the parent organization.
 *
 * vdb-entry: VDBs are loosely defined as sites that provide information about this vulnerability, such as advisories, with identifiers. Included VDBs are free to access, substantially public, and have broad scope and coverage (not limited to a single vendor or research organization). See: https://www.first.org/global/sigs/vrdx/vdb-catalog
 */
export const HttpsCveMitreOrgCveV5_00TagsReference = z.union([
  z.literal("broken-link"),
  z.literal("customer-entitlement"),
  z.literal("exploit"),
  z.literal("government-resource"),
  z.literal("issue-tracking"),
  z.literal("mailing-list"),
  z.literal("mitigation"),
  z.literal("not-applicable"),
  z.literal("patch"),
  z.literal("permissions-required"),
  z.literal("media-coverage"),
  z.literal("product"),
  z.literal("related"),
  z.literal("release-notes"),
  z.literal("signature"),
  z.literal("technical-description"),
  z.literal("third-party-advisory"),
  z.literal("vendor-advisory"),
  z.literal("vdb-entry"),
]);
export type HttpsCveMitreOrgCveV5_00TagsReference = z.infer<
  typeof HttpsCveMitreOrgCveV5_00TagsReference
>;

/**
 * Collection of impact scores with attribution.
 *
 * @minItems 1
 */
export const Metrics = z.any();
export type Metrics = z.infer<typeof Metrics>;

/**
 * This is timeline information for significant events about this vulnerability or changes to the CVE Record.
 *
 * @minItems 1
 */
export const Timeline = z.array(
  z.object({
    time: z.string(),
    lang: z.string(),
    value: z.string(),
  })
);
export type Timeline = z.infer<typeof Timeline>;

/**
 * Statements acknowledging specific people, organizations, or tools recognizing the work done in researching, discovering, remediating or helping with activities related to this CVE.
 *
 * @minItems 1
 */
export const Credits = z.array(
  z.object({
    lang: z.string(),
    value: z.string(),
    user: z.string().optional(),
    type: z
      .union([
        z.literal("finder"),
        z.literal("reporter"),
        z.literal("analyst"),
        z.literal("coordinator"),
        z.literal("remediation developer"),
        z.literal("remediation reviewer"),
        z.literal("remediation verifier"),
        z.literal("tool"),
        z.literal("sponsor"),
        z.literal("other"),
      ])
      .optional(),
  })
);
export type Credits = z.infer<typeof Credits>;

/**
 * exclusively-hosted-service: All known software and/or hardware affected by this CVE Record is known to exist only in the affected hosted service. If the vulnerability affects both hosted and on-prem software and/or hardware, then the tag should not be used.
 *
 * unsupported-when-assigned: Used by the assigning CNA to indicate that when a request for a CVE assignment was received, the product was already end-of-life (EOL) or a product or specific version was deemed not to be supported by the vendor. This tag should only be applied to a CVE Record when all affected products or version lines referenced in the CVE-Record are EOL.
 *
 * disputed: When one party disagrees with another party's assertion that a particular issue in software is a vulnerability, a CVE Record assigned to that issue may be tagged as being 'disputed'.
 */
export const HttpsCveMitreOrgCveV5_00TagsCna = z.union([
  z.literal("unsupported-when-assigned"),
  z.literal("exclusively-hosted-service"),
  z.literal("disputed"),
]);
export type HttpsCveMitreOrgCveV5_00TagsCnaSchema = z.infer<
  typeof HttpsCveMitreOrgCveV5_00TagsCna
>;

/**
 * List of taxonomy items related to the vulnerability.
 *
 * @minItems 1
 */
export const TaxonomyMappings = z.array(
  z.object({
    taxonomyName: z.string(),
    taxonomyVersion: z.string().optional(),
    taxonomyRelations: z.array(
      z.object({
        taxonomyId: z.string(),
        relationshipName: z.string(),
        relationshipValue: z.string(),
      })
    ),
  })
);
export type TaxonomyMappings = z.infer<typeof TaxonomyMappings>;

/**
 * disputed: When one party disagrees with another party's assertion that a particular issue in software is a vulnerability, a CVE Record assigned to that issue may be tagged as being 'disputed'.
 */
export const HttpsCveMitreOrgCveV5_00TagsAdp = z.literal("disputed");
export type HttpsCveMitreOrgCveV5_00TagsAdp = z.infer<
  typeof HttpsCveMitreOrgCveV5_00TagsAdp
>;

export const CveId = z.string();
export type CveId = z.infer<typeof CveId>;

/**
 * This is meta data about the CVE ID such as the CVE ID, who requested it, who assigned it, when it was requested, the current state (PUBLISHED, REJECTED, etc.) and so on.  These fields are controlled by the CVE Services.
 */
export const CveMetadataPublished = z.object({
  /**
   * The CVE identifier that this record pertains to.
   */
  cveId: z.string(),

  /**
   * The UUID for the organization to which the CVE ID was originally assigned. This UUID can be used to lookup the organization record in the user registry service.
   */
  assignerOrgId: z.string(),

  /**
   * The short name for the organization to which the CVE ID was originally assigned.
   */
  assignerShortName: z.string().optional(),

  /**
   * The user that requested the CVE identifier.
   */
  requesterUserId: z.string().optional(),

  /**
   * The date/time the record was last updated.
   */
  dateUpdated: z.string().optional(),

  /**
   * The system of record causes this to start at 1, and increment by 1 each time a submission from a data provider changes this CVE Record. The incremented value moves to the Rejected schema upon a PUBLISHED->REJECTED transition, and moves to the Published schema upon a REJECTED->PUBLISHED transition.
   */
  serial: z.number().optional(),

  /**
   * The date/time this CVE ID was reserved in the CVE automation workgroup services system. Disclaimer: This date reflects when the CVE ID was reserved, and does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE.
   */
  dateReserved: z.string().optional(),

  /**
   * The date/time the CVE Record was first published in the CVE List.
   */
  datePublished: z.string().optional(),

  /**
   * State of CVE - PUBLISHED, REJECTED.
   */
  state: z.literal("PUBLISHED"),
});
export type CveMetadataPublished = z.infer<typeof CveMetadataPublished>;

/**
 * Details related to the information container provider (CNA or ADP).
 */
export const ProviderMetadata = z.object({
  /**
   * The container provider's organizational UUID.
   */
  orgId: z.string(),

  /**
   * The container provider's organizational short name.
   */
  shortName: z.string().optional(),

  /**
   * Timestamp to be set by the system of record at time of submission. If dateUpdated is provided to the system of record it will be replaced by the current timestamp at the time of submission.
   */
  dateUpdated: z.string().optional(),
});
export type ProviderMetadata = z.infer<typeof ProviderMetadata>;

/**
 * This is the source information (who discovered it, who researched it, etc.) and optionally a chain of CNA information (e.g. the originating CNA and subsequent parent CNAs who have processed it before it arrives at the MITRE root).
 *  Must contain: IF this is in the root level it MUST contain a CNA_chain entry, IF this source entry is NOT in the root (e.g. it is part of a vendor statement) then it must contain at least one type of data entry.
 */
export const Source = z.any();
export type Source = z.infer<typeof Source>;

/**
 * Tags provided by a CNA describing the CVE Record.
 *
 * @minItems 1
 */
export const CnaTags = z.array(
  z.union([TagExtension, HttpsCveMitreOrgCveV5_00TagsCna])
);
export type CnaTags = z.infer<typeof CnaTags>;

/**
 * Supporting media data for the description such as markdown, diagrams, .. (optional). Similar to RFC 2397 each media object has three main parts: media type, media data value, and an optional boolean flag to indicate if the media data is base64 encoded.
 *
 * @minItems 1
 */
export const SupportingMedia = z.array(
  z.object({
    type: MediaType,
    base64: Encoding.optional(),
    value: z.string(),
  })
);
export type SupportingMedia = z.infer<typeof SupportingMedia>;

export const Reference = z.object({
  /**
   * The uniform resource locator (URL), according to [RFC 3986](https://tools.ietf.org/html/rfc3986#section-1.1.3), that can be used to retrieve the referenced resource.
   */
  url: z.string(),

  /**
   * User created name for the reference, often the title of the page.
   */
  name: z.string().optional(),

  /**
   * An array of one or more tags that describe the resource referenced by 'url'.
   *
   * @minItems 1
   */
  tags: z
    .array(z.union([TagExtension, HttpsCveMitreOrgCveV5_00TagsReference]))
    .optional(),

  /**
   * Custom: Optional extension with [Open Graph metadata](https://ogp.me/) for the reference.
   */
  openGraphData: OpenGraphData.optional(),
});
export type Reference = z.infer<typeof Reference>;

/**
 * This is reference data in the form of URLs or file objects (uuencoded and embedded within the JSON file, exact format to be decided, e.g. we may require a compressed format so the objects require unpacking before they are "dangerous").
 *
 * @minItems 1
 * @maxItems 512
 */
export const References = z.array(Reference);
export type References = z.infer<typeof References>;

/**
 * Tags provided by an ADP describing the CVE Record.
 *
 * @minItems 1
 */
export const AdpTags = z.array(
  z.union([TagExtension, HttpsCveMitreOrgCveV5_00TagsAdp])
);
export type AdpTags = z.infer<typeof AdpTags>;

/**
 * This is meta data about the CVE ID such as the CVE ID, who requested it, who assigned it, when it was requested, the current state (PUBLISHED, REJECTED, etc.) and so on.  These fields are controlled by the CVE Services.
 */
export const CveMetadataRejected = z.object({
  /**
   * The CVE identifier that this record pertains to.
   */
  cveId: z.string(),

  /**
   * The UUID for the organization to which the CVE ID was originally assigned.
   */
  assignerOrgId: z.string(),

  /**
   * The short name for the organization to which the CVE ID was originally assigned.
   */
  assignerShortName: z.string().optional(),

  /**
   * The system of record causes this to start at 1, and increment by 1 each time a submission from a data provider changes this CVE Record. The incremented value moves to the Rejected schema upon a PUBLISHED->REJECTED transition, and moves to the Published schema upon a REJECTED->PUBLISHED transition.
   */
  serial: z.number().optional(),

  /**
   * The date/time the record was last updated.
   */
  dateUpdated: z.string().optional(),

  /**
   * The date/time the CVE Record was first published in the CVE List.
   */
  datePublished: z.string().optional(),

  /**
   * The date/time the CVE ID was rejected.
   */
  dateRejected: z.string().optional(),

  /**
   * State of CVE - PUBLISHED, REJECTED.
   */
  state: z.literal("REJECTED"),

  /**
   * The date/time this CVE ID was reserved in the CVE automation workgroup services system. Disclaimer: This date reflects when the CVE ID was reserved, and does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE.
   */
  dateReserved: z.string().optional(),
});
export type CveMetadataRejected = z.infer<typeof CveMetadataRejected>;

/**
 * Text in a particular language with optional alternate markup or formatted representation (e.g., Markdown) or embedded media.
 */
export const Description = z.object({
  lang: Language,
  value: z.string(),
  supportingMedia: SupportingMedia.optional(),
});
export type Description = z.infer<typeof Description>;

/**
 * Product versions or version ranges. Satisfies the CNA Rules [8.1.2 requirement](https://cve.mitre.org/cve/cna/rules.html#section_8-1_cve_entry_information_requirements).
 */
export const Version = z.object({
  version: z.string(),
  status: z.string(),
  versionType: z.string().optional(),
  lessThan: z.string().optional(),
  lessThanOrEqual: z.string().optional(),
});
export type Version = z.infer<typeof Version>;

/**
 * Provides information about the set of products and services affected by this vulnerability.
 */
export const Product = z.object({
  /**
   * Name of the organization, project, community, individual, or user that created or maintains this product or hosted service. Can be 'N/A' if none of those apply. When collectionURL and packageName are used, this field may optionally represent the user or account within the package collection associated with the package.
   */
  vendor: z.string().optional(),

  /**
   * Name of the affected product.
   */
  product: z.string().optional(),

  /**
   * URL identifying a package collection (determines the meaning of packageName).
   */
  collectionURL: z.string().optional(),

  /**
   * Name or identifier of the affected software package as used in the package collection.
   */
  packageName: z.string().optional(),

  /**
   * Affected products defined by CPE. This is an array of CPE values (vulnerable and not), we use an array so that we can make multiple statements about the same version and they are separate (if we used a JSON object we'd essentially be keying on the CPE name and they would have to overlap). Also, this allows things like cveDataVersion or cveDescription to be applied directly to the product entry. This also allows more complex statements such as "Product X between versions 10.2 and 10.8" to be put in a machine-readable format. As well since multiple statements can be used multiple branches of the same product can be defined here.
   */
  cpes: z.array(CPEName).optional(),

  /**
   * A list of the affected components, features, modules, sub-components, sub-products, APIs, commands, utilities, programs, or functionalities (optional).
   */
  modules: z.array(z.string()).optional(),

  /**
   * A list of the affected source code files (optional).
   */
  programFiles: z.array(z.string()).optional(),

  /**
   * A list of the affected source code functions, methods, subroutines, or procedures (optional).
   */
  programRoutines: z
    .array(
      z.object({
        /**
         * Name of the affected source code file, function, method, subroutine, or procedure.
         */
        name: z.string(),
      })
    )
    .optional(),
  platforms: Platforms.optional(),

  /**
   * The URL of the source code repository, for informational purposes and/or to resolve git hash version ranges.
   */
  repo: z.string().optional(),

  /**
   * The default status for versions that are not otherwise listed in the versions list. If not specified, defaultStatus defaults to 'unknown'. Versions or defaultStatus may be omitted, but not both.
   */
  defaultStatus: z
    .union([
      z.literal("affected"),
      z.literal("unaffected"),
      z.literal("unknown"),
    ])
    .optional(),

  /**
   * Set of product versions or version ranges related to the vulnerability.
   * Versions or defaultStatus may be omitted, but not both.
   *
   * @minItems 1
   */
  versions: z.array(Version).optional(),
});
export type Product = z.infer<typeof Product>;

/**
 * This is problem type information (e.g. CWE identifier). Must contain: At least one entry, can be text, OWASP, CWE, please note that while only one is required you can use more than one (or indeed all three) as long as they are correct). (CNA requirement: [PROBLEMTYPE]).
 *
 * @minItems 1
 */
export const ProblemTypes = z.array(
  z.object({
    descriptions: z.array(
      z.object({
        lang: Language,
        /**
         * Text description of problemType, or title from CWE or OWASP.
         */
        description: z.string(),

        /**
         * CWE ID of the CWE that best describes this problemType entry.
         */
        cweId: z.string().optional(),

        /**
         * Problemtype source, text, OWASP, CWE, etc.,
         */
        type: z.string().optional(),
        references: References.optional(),
      })
    ),
  })
);

/**
 * This is problem type information (e.g. CWE identifier). Must contain: At least one entry, can be text, OWASP, CWE, please note that while only one is required you can use more than one (or indeed all three) as long as they are correct). (CNA requirement: [PROBLEMTYPE]).
 *
 * @minItems 1
 */
export type ProblemTypes = z.infer<typeof ProblemTypes>;

export const Descriptions = z.array(Description);
export type Descriptions = z.infer<typeof Descriptions>;

/**
 * Configurations required for exploiting this vulnerability.
 *
 * @minItems 1
 */
export const Configurations = Descriptions;
export type Configurations = z.infer<typeof Configurations>;

/**
 * Workarounds and mitigations for this vulnerability.
 *
 * @minItems 1
 */
export const Workarounds = Descriptions;
export type Workarounds = z.infer<typeof Workarounds>;

/**
 * Information about solutions or remediations available for this vulnerability.
 *
 * @minItems 1
 */
export const Solutions = Descriptions;
export type Solutions = z.infer<typeof Solutions>;

/**
 * Information about exploits of the vulnerability.
 *
 * @minItems 1
 */
export const Exploits = Descriptions;
export type Exploits = z.infer<typeof Exploits>;

/**
 * List of affected products.
 *
 * @minItems 1
 */
export const Affected = z.array(Product);
export type Affected = z.infer<typeof Affected>;

/**
 * Collection of impacts of this vulnerability.
 *
 * @minItems 1
 */
export const Impacts = z.array(
  z.object({
    capecId: z.string().optional(),
    descriptions: Descriptions,
  })
);
export type Impacts = z.infer<typeof Impacts>;

/**
 * An object containing the vulnerability information provided by an Authorized Data Publisher (ADP). Since multiple ADPs can provide information for a CVE ID, an ADP container must indicate which ADP is the source of the information in the object.
 */
export const AdpContainer = z.object({
  providerMetadata: ProviderMetadata,

  /**
   * If known, the date/time the vulnerability was disclosed publicly.
   */
  datePublic: z.string().optional(),

  /**
   * A title, headline, or a brief phrase summarizing the information in an ADP container.
   */
  title: z.string().optional(),
  descriptions: Descriptions.optional(),
  affected: Affected.optional(),
  problemTypes: ProblemTypes.optional(),
  references: References.optional(),
  impacts: Impacts.optional(),
  metrics: Metrics.optional(),
  configurations: Configurations.optional(),
  workarounds: Workarounds.optional(),
  solutions: Solutions.optional(),
  exploits: Exploits.optional(),
  timeline: Timeline.optional(),
  credits: Credits.optional(),
  source: Source.optional(),
  tags: AdpTags.optional(),
  taxonomyMappings: TaxonomyMappings.optional(),
});
export type AdpContainer = z.infer<typeof AdpContainer>;

/**
 * An object containing the vulnerability information provided by a CVE Numbering Authority (CNA) for a rejected CVE ID. There can only be one CNA container per CVE record since there can only be one assigning CNA.
 */
export const CnaRejectedContainer = z.object({
  providerMetadata: ProviderMetadata,
  rejectedReasons: Descriptions,
  replacedBy: z.tuple([CveId]).rest(CveId).optional(),
});
export type CnaRejectedContainer = z.infer<typeof CnaRejectedContainer>;

/**
 * If the CVE ID and associated CVE Record should no longer be used, the CVE Record is placed in the Rejected state. A Rejected CVE Record remains on the CVE List so that users can know when it is invalid.
 */
export const Rejected = z.object({
  dataType: DataType,
  dataVersion: DataVersion,
  cveMetadata: CveMetadataRejected,
  containers: z.object({
    cna: CnaRejectedContainer,
  }),
});
export type Rejected = z.infer<typeof Rejected>;

/**
 * An object containing the vulnerability information provided by a CVE Numbering Authority (CNA) for a published CVE ID. There can only be one CNA container per CVE record since there can only be one assigning CNA. The CNA container must include the required information defined in the CVE Rules, which includes a product, version, problem type, prose description, and a reference.
 */
export const CnaPublishedContainer = z.object({
  providerMetadata: ProviderMetadata,
  dateAssigned: z.string().optional(),
  datePublic: z.string().optional(),
  title: z.string().optional(),
  descriptions: Descriptions.optional(),
  affected: Affected.optional(),
  problemTypes: ProblemTypes.optional(),
  references: References.optional(),
  impacts: Impacts.optional(),
  metrics: Metrics.optional(),
  configurations: Configurations.optional(),
  workarounds: Workarounds.optional(),
  solutions: Solutions.optional(),
  exploits: Exploits.optional(),
  timeline: Timeline.optional(),
  credits: Credits.optional(),
  source: Source.optional(),
  tags: CnaTags.optional(),
  taxonomyMappings: TaxonomyMappings.optional(),
});
export type CnaPublishedContainer = z.infer<typeof CnaPublishedContainer>;

/**
 * When a CNA populates the data associated with a CVE ID as a CVE Record, the state of the CVE Record is Published.
 */
export const Published = z.object({
  dataType: DataType,
  dataVersion: DataVersion,
  cveMetadata: CveMetadataPublished,
  containers: z.object({
    cna: CnaPublishedContainer,
    adp: z.tuple([AdpContainer]).rest(AdpContainer).optional(),
  }),
});
export type Published = z.infer<typeof Published>;

/**
 * cve-schema specifies the CVE JSON record format. This is the blueprint for a rich set of JSON data that can be submitted by CVE Numbering Authorities (CNAs) and Authorized Data Publishers (ADPs) to describe a CVE Record. Some examples of CVE Record data include CVE ID number, affected product(s), affected version(s), and public references. While those specific items are required when assigning a CVE, there are many other optional data in the schema that can be used to enrich CVE Records for community benefit. Learn more about the CVE program at [the official website](https://cve.mitre.org). This CVE JSON record format is defined using JSON Schema. Learn more about JSON Schema [here](https://json-schema.org/).
 */
export const CVERecord = z.union([Published, Rejected]);
export type CVERecord = z.infer<typeof CVERecord>;
