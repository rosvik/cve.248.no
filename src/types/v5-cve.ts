import { OpenGraphData } from "../utils/fetch-opengraph-data";

/**
 * cve-schema specifies the CVE JSON record format. This is the blueprint for a rich set of JSON data that can be submitted by CVE Numbering Authorities (CNAs) and Authorized Data Publishers (ADPs) to describe a CVE Record. Some examples of CVE Record data include CVE ID number, affected product(s), affected version(s), and public references. While those specific items are required when assigning a CVE, there are many other optional data in the schema that can be used to enrich CVE Records for community benefit. Learn more about the CVE program at [the official website](https://cve.mitre.org). This CVE JSON record format is defined using JSON Schema. Learn more about JSON Schema [here](https://json-schema.org/).
 */
export type CVEJSONRecordFormat = Published | Rejected;
/**
 * Indicates the type of information represented in the JSON instance.
 */
export type DataType = "CVE_RECORD";
/**
 * The version of the schema being used. Used to support multiple versions of this format.
 */
export type DataVersion = "5.0";
/**
 * A list of multi-lingual descriptions of the vulnerability. E.g., [PROBLEMTYPE] in [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] on [PLATFORMS] allows [ATTACKER] to [IMPACT] via [VECTOR]. OR [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] [ROOT CAUSE], which allows [ATTACKER] to [IMPACT] via [VECTOR].
 *
 * @minItems 1
 */
export type Descriptions = [Description, ...Description[]];
/**
 * BCP 47 language code, language-region.
 */
export type Language = string;
/**
 * Supporting media data for the description such as markdown, diagrams, .. (optional). Similar to RFC 2397 each media object has three main parts: media type, media data value, and an optional boolean flag to indicate if the media data is base64 encoded.
 *
 * @minItems 1
 */
export type SupportingMedia = [
  {
    type: MediaType;
    base64?: Encoding;
    /**
     * Supporting media content, up to 16K. If base64 is true, this field stores base64 encoded data.
     */
    value: string;
    [k: string]: unknown;
  },
  ...{
    type: MediaType;
    base64?: Encoding;
    /**
     * Supporting media content, up to 16K. If base64 is true, this field stores base64 encoded data.
     */
    value: string;
    [k: string]: unknown;
  }[]
];
/**
 * RFC2046 compliant IANA Media type for eg., text/markdown, text/html.
 */
export type MediaType = string;
/**
 * If true then the value field contains the media data encoded in base64. If false then the value field contains the UTF-8 media content.
 */
export type Encoding = boolean;
/**
 * List of affected products.
 *
 * @minItems 1
 */
export type Affected = [Product, ...Product[]];
/**
 * Provides information about the set of products and services affected by this vulnerability.
 */
export type Product = {
  /**
   * Name of the organization, project, community, individual, or user that created or maintains this product or hosted service. Can be 'N/A' if none of those apply. When collectionURL and packageName are used, this field may optionally represent the user or account within the package collection associated with the package.
   */
  vendor?: string;
  /**
   * Name of the affected product.
   */
  product?: string;
  /**
   * URL identifying a package collection (determines the meaning of packageName).
   */
  collectionURL?: string;
  /**
   * Name or identifier of the affected software package as used in the package collection.
   */
  packageName?: string;
  /**
   * Affected products defined by CPE. This is an array of CPE values (vulnerable and not), we use an array so that we can make multiple statements about the same version and they are separate (if we used a JSON object we'd essentially be keying on the CPE name and they would have to overlap). Also, this allows things like cveDataVersion or cveDescription to be applied directly to the product entry. This also allows more complex statements such as "Product X between versions 10.2 and 10.8" to be put in a machine-readable format. As well since multiple statements can be used multiple branches of the same product can be defined here.
   */
  cpes?: CPEName[];
  /**
   * A list of the affected components, features, modules, sub-components, sub-products, APIs, commands, utilities, programs, or functionalities (optional).
   */
  modules?: string[];
  /**
   * A list of the affected source code files (optional).
   */
  programFiles?: string[];
  /**
   * A list of the affected source code functions, methods, subroutines, or procedures (optional).
   */
  programRoutines?: {
    /**
     * Name of the affected source code file, function, method, subroutine, or procedure.
     */
    name: string;
  }[];
  platforms?: Platforms;
  /**
   * The URL of the source code repository, for informational purposes and/or to resolve git hash version ranges.
   */
  repo?: string;
  /**
   * The default status for versions that are not otherwise listed in the versions list. If not specified, defaultStatus defaults to 'unknown'. Versions or defaultStatus may be omitted, but not both.
   */
  defaultStatus?: "affected" | "unaffected" | "unknown";
  /**
   * Set of product versions or version ranges related to the vulnerability.
   * Versions or defaultStatus may be omitted, but not both.
   *
   * @minItems 1
   */
  versions?: [Version, ...Version[]];
  [k: string]: unknown;
};
/**
 * Product versions or version ranges. Satisfies the CNA Rules [8.1.2 requirement](https://cve.mitre.org/cve/cna/rules.html#section_8-1_cve_entry_information_requirements).
 */
export type Version = {
  version: string;
  status: string;
  versionType?: string;
  lessThan?: string;
  lessThanOrEqual?: string;
};
/**
 * Common Platform Enumeration (CPE) Name in either 2.2 or 2.3 format
 */
export type CPEName = string;
/**
 * List of specific platforms if the vulnerability is only relevant in the context of these platforms (optional). Platforms may include execution environments, operating systems, virtualization technologies, hardware models, or computing architectures. The lack of this field or an empty array implies that the other fields are applicable to all relevant platforms.
 *
 * @minItems 1
 */
export type Platforms = [string, ...string[]];
/**
 * This is problem type information (e.g. CWE identifier). Must contain: At least one entry, can be text, OWASP, CWE, please note that while only one is required you can use more than one (or indeed all three) as long as they are correct). (CNA requirement: [PROBLEMTYPE]).
 *
 * @minItems 1
 */
export type ProblemTypes = [
  {
    /**
     * @minItems 1
     */
    descriptions: [
      {
        lang: Language;
        /**
         * Text description of problemType, or title from CWE or OWASP.
         */
        description: string;
        /**
         * CWE ID of the CWE that best describes this problemType entry.
         */
        cweId?: string;
        /**
         * Problemtype source, text, OWASP, CWE, etc.,
         */
        type?: string;
        references?: References;
        [k: string]: unknown;
      },
      ...{
        lang: Language;
        /**
         * Text description of problemType, or title from CWE or OWASP.
         */
        description: string;
        /**
         * CWE ID of the CWE that best describes this problemType entry.
         */
        cweId?: string;
        /**
         * Problemtype source, text, OWASP, CWE, etc.,
         */
        type?: string;
        references?: References;
        [k: string]: unknown;
      }[]
    ];
    [k: string]: unknown;
  },
  ...{
    /**
     * @minItems 1
     */
    descriptions: [
      {
        lang: Language;
        /**
         * Text description of problemType, or title from CWE or OWASP.
         */
        description: string;
        /**
         * CWE ID of the CWE that best describes this problemType entry.
         */
        cweId?: string;
        /**
         * Problemtype source, text, OWASP, CWE, etc.,
         */
        type?: string;
        references?: References;
        [k: string]: unknown;
      },
      ...{
        lang: Language;
        /**
         * Text description of problemType, or title from CWE or OWASP.
         */
        description: string;
        /**
         * CWE ID of the CWE that best describes this problemType entry.
         */
        cweId?: string;
        /**
         * Problemtype source, text, OWASP, CWE, etc.,
         */
        type?: string;
        references?: References;
        [k: string]: unknown;
      }[]
    ];
    [k: string]: unknown;
  }[]
];
/**
 * This is reference data in the form of URLs or file objects (uuencoded and embedded within the JSON file, exact format to be decided, e.g. we may require a compressed format so the objects require unpacking before they are "dangerous").
 *
 * @minItems 1
 * @maxItems 512
 */
export type References = [Reference, ...Reference[]];
export type TagExtension = string;
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
export type HttpsCveMitreOrgCveV5_00TagsReference =
  | "broken-link"
  | "customer-entitlement"
  | "exploit"
  | "government-resource"
  | "issue-tracking"
  | "mailing-list"
  | "mitigation"
  | "not-applicable"
  | "patch"
  | "permissions-required"
  | "media-coverage"
  | "product"
  | "related"
  | "release-notes"
  | "signature"
  | "technical-description"
  | "third-party-advisory"
  | "vendor-advisory"
  | "vdb-entry";
/**
 * Collection of impacts of this vulnerability.
 *
 * @minItems 1
 */
export type Impacts = [
  {
    /**
     * CAPEC ID that best relates to this impact.
     */
    capecId?: string;
    descriptions: Descriptions1;
    [k: string]: unknown;
  },
  ...{
    /**
     * CAPEC ID that best relates to this impact.
     */
    capecId?: string;
    descriptions: Descriptions1;
    [k: string]: unknown;
  }[]
];
/**
 * A list of multi-lingual descriptions of the vulnerability. E.g., [PROBLEMTYPE] in [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] on [PLATFORMS] allows [ATTACKER] to [IMPACT] via [VECTOR]. OR [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] [ROOT CAUSE], which allows [ATTACKER] to [IMPACT] via [VECTOR].
 *
 * @minItems 1
 */
export type Descriptions1 = [Description, ...Description[]];
/**
 * Collection of impact scores with attribution.
 *
 * @minItems 1
 */
export type Metrics = [
  (
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
  ),
  ...(
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
  )[]
];
/**
 * Configurations required for exploiting this vulnerability.
 *
 * @minItems 1
 */
export type Configurations = [Description, ...Description[]];
/**
 * Workarounds and mitigations for this vulnerability.
 *
 * @minItems 1
 */
export type Workarounds = [Description, ...Description[]];
/**
 * Information about solutions or remediations available for this vulnerability.
 *
 * @minItems 1
 */
export type Solutions = [Description, ...Description[]];
/**
 * Information about exploits of the vulnerability.
 *
 * @minItems 1
 */
export type Exploits = [Description, ...Description[]];
/**
 * This is timeline information for significant events about this vulnerability or changes to the CVE Record.
 *
 * @minItems 1
 */
export type Timeline = [
  {
    /**
     * Timestamp representing when the event in the timeline occurred. The timestamp format is based on RFC3339 and ISO ISO8601, with an optional timezone. yyyy-MM-ddTHH:mm:ssZZZZ - if the timezone offset is not given, GMT (0000) is assumed.
     */
    time: string;
    /**
     * BCP 47 language code, language-region.
     */
    lang: string;
    /**
     * A summary of the event.
     */
    value: string;
    [k: string]: unknown;
  },
  ...{
    /**
     * Timestamp representing when the event in the timeline occurred. The timestamp format is based on RFC3339 and ISO ISO8601, with an optional timezone. yyyy-MM-ddTHH:mm:ssZZZZ - if the timezone offset is not given, GMT (0000) is assumed.
     */
    time: string;
    /**
     * BCP 47 language code, language-region.
     */
    lang: string;
    /**
     * A summary of the event.
     */
    value: string;
    [k: string]: unknown;
  }[]
];
/**
 * Statements acknowledging specific people, organizations, or tools recognizing the work done in researching, discovering, remediating or helping with activities related to this CVE.
 *
 * @minItems 1
 */
export type Credits = [
  {
    /**
     * BCP 47 language code, language-region.
     */
    lang: string;
    value: string;
    /**
     * UUID of the user being credited if present in the CVE User Registry (optional). This UUID can be used to lookup the user record in the user registry service.
     */
    user?: string;
    /**
     * Type or role of the entity being credited (optional). finder: identifies the vulnerability.
     * reporter: notifies the vendor of the vulnerability to a CNA.
     * analyst: validates the vulnerability to ensure accuracy or severity.
     * coordinator: facilitates the coordinated response process.
     * remediation developer: prepares a code change or other remediation plans.
     * remediation reviewer: reviews vulnerability remediation plans or code changes for effectiveness and completeness.
     * remediation verifier: tests and verifies the vulnerability or its remediation.
     * tool: names of tools used in vulnerability discovery or identification.
     * sponsor: supports the vulnerability identification or remediation activities.
     */
    type?:
      | "finder"
      | "reporter"
      | "analyst"
      | "coordinator"
      | "remediation developer"
      | "remediation reviewer"
      | "remediation verifier"
      | "tool"
      | "sponsor"
      | "other";
    [k: string]: unknown;
  },
  ...{
    /**
     * BCP 47 language code, language-region.
     */
    lang: string;
    value: string;
    /**
     * UUID of the user being credited if present in the CVE User Registry (optional). This UUID can be used to lookup the user record in the user registry service.
     */
    user?: string;
    /**
     * Type or role of the entity being credited (optional). finder: identifies the vulnerability.
     * reporter: notifies the vendor of the vulnerability to a CNA.
     * analyst: validates the vulnerability to ensure accuracy or severity.
     * coordinator: facilitates the coordinated response process.
     * remediation developer: prepares a code change or other remediation plans.
     * remediation reviewer: reviews vulnerability remediation plans or code changes for effectiveness and completeness.
     * remediation verifier: tests and verifies the vulnerability or its remediation.
     * tool: names of tools used in vulnerability discovery or identification.
     * sponsor: supports the vulnerability identification or remediation activities.
     */
    type?:
      | "finder"
      | "reporter"
      | "analyst"
      | "coordinator"
      | "remediation developer"
      | "remediation reviewer"
      | "remediation verifier"
      | "tool"
      | "sponsor"
      | "other";
    [k: string]: unknown;
  }[]
];
/**
 * Tags provided by a CNA describing the CVE Record.
 *
 * @minItems 1
 */
export type CnaTags = [
  TagExtension | HttpsCveMitreOrgCveV5_00TagsCna,
  ...(TagExtension | HttpsCveMitreOrgCveV5_00TagsCna)[]
];
/**
 * exclusively-hosted-service: All known software and/or hardware affected by this CVE Record is known to exist only in the affected hosted service. If the vulnerability affects both hosted and on-prem software and/or hardware, then the tag should not be used.
 *
 * unsupported-when-assigned: Used by the assigning CNA to indicate that when a request for a CVE assignment was received, the product was already end-of-life (EOL) or a product or specific version was deemed not to be supported by the vendor. This tag should only be applied to a CVE Record when all affected products or version lines referenced in the CVE-Record are EOL.
 *
 * disputed: When one party disagrees with another party's assertion that a particular issue in software is a vulnerability, a CVE Record assigned to that issue may be tagged as being 'disputed'.
 */
export type HttpsCveMitreOrgCveV5_00TagsCna =
  | "unsupported-when-assigned"
  | "exclusively-hosted-service"
  | "disputed";
/**
 * List of taxonomy items related to the vulnerability.
 *
 * @minItems 1
 */
export type TaxonomyMappings = [
  {
    /**
     * The name of the taxonomy.
     */
    taxonomyName: string;
    /**
     * The version of taxonomy the identifiers come from.
     */
    taxonomyVersion?: string;
    /**
     * @minItems 1
     */
    taxonomyRelations: [
      {
        /**
         * Identifier of the item in the taxonomy.  Used as the subject of the relationship.
         */
        taxonomyId: string;
        /**
         * A description of the relationship.
         */
        relationshipName: string;
        /**
         * The target of the relationship.  Can be the CVE ID or another taxonomy identifier.
         */
        relationshipValue: string;
        [k: string]: unknown;
      },
      ...{
        /**
         * Identifier of the item in the taxonomy.  Used as the subject of the relationship.
         */
        taxonomyId: string;
        /**
         * A description of the relationship.
         */
        relationshipName: string;
        /**
         * The target of the relationship.  Can be the CVE ID or another taxonomy identifier.
         */
        relationshipValue: string;
        [k: string]: unknown;
      }[]
    ];
    [k: string]: unknown;
  },
  ...{
    /**
     * The name of the taxonomy.
     */
    taxonomyName: string;
    /**
     * The version of taxonomy the identifiers come from.
     */
    taxonomyVersion?: string;
    /**
     * @minItems 1
     */
    taxonomyRelations: [
      {
        /**
         * Identifier of the item in the taxonomy.  Used as the subject of the relationship.
         */
        taxonomyId: string;
        /**
         * A description of the relationship.
         */
        relationshipName: string;
        /**
         * The target of the relationship.  Can be the CVE ID or another taxonomy identifier.
         */
        relationshipValue: string;
        [k: string]: unknown;
      },
      ...{
        /**
         * Identifier of the item in the taxonomy.  Used as the subject of the relationship.
         */
        taxonomyId: string;
        /**
         * A description of the relationship.
         */
        relationshipName: string;
        /**
         * The target of the relationship.  Can be the CVE ID or another taxonomy identifier.
         */
        relationshipValue: string;
        [k: string]: unknown;
      }[]
    ];
    [k: string]: unknown;
  }[]
];
/**
 * Tags provided by an ADP describing the CVE Record.
 *
 * @minItems 1
 */
export type AdpTags = [
  TagExtension | HttpsCveMitreOrgCveV5_00TagsAdp,
  ...(TagExtension | HttpsCveMitreOrgCveV5_00TagsAdp)[]
];
/**
 * disputed: When one party disagrees with another party's assertion that a particular issue in software is a vulnerability, a CVE Record assigned to that issue may be tagged as being 'disputed'.
 */
export type HttpsCveMitreOrgCveV5_00TagsAdp = "disputed";
/**
 * A list of multi-lingual descriptions of the vulnerability. E.g., [PROBLEMTYPE] in [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] on [PLATFORMS] allows [ATTACKER] to [IMPACT] via [VECTOR]. OR [COMPONENT] in [VENDOR] [PRODUCT] [VERSION] [ROOT CAUSE], which allows [ATTACKER] to [IMPACT] via [VECTOR].
 *
 * @minItems 1
 */
export type Descriptions2 = [Description, ...Description[]];
export type CveId = string;

/**
 * When a CNA populates the data associated with a CVE ID as a CVE Record, the state of the CVE Record is Published.
 */
export interface Published {
  dataType: DataType;
  dataVersion: DataVersion;
  cveMetadata: CveMetadataPublished;
  /**
   * A set of structures (called containers) used to store vulnerability information related to a specific CVE ID provided by a specific organization participating in the CVE program. Each container includes information provided by a different source.
   *
   * At a minimum, a 'cna' container containing the vulnerability information provided by the CNA who initially assigned the CVE ID must be included.
   *
   * There can only be one 'cna' container, as there can only be one assigning CNA. However, there can be multiple 'adp' containers, allowing multiple organizations participating in the CVE program to add additional information related to the vulnerability. For the most part, the 'cna' and 'adp' containers contain the same properties. The main differences are the source of the information. The 'cna' container requires the CNA to include certain fields, while the 'adp' container does not.
   */
  containers: {
    cna: CnaPublishedContainer;
    /**
     * @minItems 1
     */
    adp?: [AdpContainer, ...AdpContainer[]];
  };
}
/**
 * This is meta data about the CVE ID such as the CVE ID, who requested it, who assigned it, when it was requested, the current state (PUBLISHED, REJECTED, etc.) and so on.  These fields are controlled by the CVE Services.
 */
export interface CveMetadataPublished {
  /**
   * The CVE identifier that this record pertains to.
   */
  cveId: string;
  /**
   * The UUID for the organization to which the CVE ID was originally assigned. This UUID can be used to lookup the organization record in the user registry service.
   */
  assignerOrgId: string;
  /**
   * The short name for the organization to which the CVE ID was originally assigned.
   */
  assignerShortName?: string;
  /**
   * The user that requested the CVE identifier.
   */
  requesterUserId?: string;
  /**
   * The date/time the record was last updated.
   */
  dateUpdated?: string;
  /**
   * The system of record causes this to start at 1, and increment by 1 each time a submission from a data provider changes this CVE Record. The incremented value moves to the Rejected schema upon a PUBLISHED->REJECTED transition, and moves to the Published schema upon a REJECTED->PUBLISHED transition.
   */
  serial?: number;
  /**
   * The date/time this CVE ID was reserved in the CVE automation workgroup services system. Disclaimer: This date reflects when the CVE ID was reserved, and does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE.
   */
  dateReserved?: string;
  /**
   * The date/time the CVE Record was first published in the CVE List.
   */
  datePublished?: string;
  /**
   * State of CVE - PUBLISHED, REJECTED.
   */
  state: "PUBLISHED";
}
/**
 * An object containing the vulnerability information provided by a CVE Numbering Authority (CNA) for a published CVE ID. There can only be one CNA container per CVE record since there can only be one assigning CNA. The CNA container must include the required information defined in the CVE Rules, which includes a product, version, problem type, prose description, and a reference.
 */
export interface CnaPublishedContainer {
  providerMetadata: ProviderMetadata;
  /**
   * The date/time this CVE ID was associated with a vulnerability by a CNA.
   */
  dateAssigned?: string;
  /**
   * If known, the date/time the vulnerability was disclosed publicly.
   */
  datePublic?: string;
  /**
   * A title, headline, or a brief phrase summarizing the CVE record. Eg., Buffer overflow in Example Soft.
   */
  title?: string;
  descriptions: Descriptions;
  affected: Affected;
  problemTypes?: ProblemTypes;
  references: References;
  impacts?: Impacts;
  metrics?: Metrics;
  configurations?: Configurations;
  workarounds?: Workarounds;
  solutions?: Solutions;
  exploits?: Exploits;
  timeline?: Timeline;
  credits?: Credits;
  source?: Source;
  tags?: CnaTags;
  taxonomyMappings?: TaxonomyMappings;
  /**
   * This interface was referenced by `CnaPublishedContainer`'s JSON-Schema definition
   * via the `patternProperty` "^x_[^.]*$".
   */
  [k: string]: unknown;
}
/**
 * Details related to the information container provider (CNA or ADP).
 */
export interface ProviderMetadata {
  /**
   * The container provider's organizational UUID.
   */
  orgId: string;
  /**
   * The container provider's organizational short name.
   */
  shortName?: string;
  /**
   * Timestamp to be set by the system of record at time of submission. If dateUpdated is provided to the system of record it will be replaced by the current timestamp at the time of submission.
   */
  dateUpdated?: string;
  [k: string]: unknown;
}
/**
 * Text in a particular language with optional alternate markup or formatted representation (e.g., Markdown) or embedded media.
 */
export interface Description {
  lang: Language;
  /**
   * Plain text description.
   */
  value: string;
  supportingMedia?: SupportingMedia;
}
export interface Reference {
  /**
   * The uniform resource locator (URL), according to [RFC 3986](https://tools.ietf.org/html/rfc3986#section-1.1.3), that can be used to retrieve the referenced resource.
   */
  url: string;
  /**
   * User created name for the reference, often the title of the page.
   */
  name?: string;
  /**
   * An array of one or more tags that describe the resource referenced by 'url'.
   *
   * @minItems 1
   */
  tags?: [
    TagExtension | HttpsCveMitreOrgCveV5_00TagsReference,
    ...(TagExtension | HttpsCveMitreOrgCveV5_00TagsReference)[]
  ];
  /**
   * Custom: Optional extension with [Open Graph metadata](https://ogp.me/) for the reference.
   */
  openGraphData?: OpenGraphData;
}
/**
 * This is the source information (who discovered it, who researched it, etc.) and optionally a chain of CNA information (e.g. the originating CNA and subsequent parent CNAs who have processed it before it arrives at the MITRE root).
 *  Must contain: IF this is in the root level it MUST contain a CNA_chain entry, IF this source entry is NOT in the root (e.g. it is part of a vendor statement) then it must contain at least one type of data entry.
 */
export interface Source {
  [k: string]: unknown;
}
/**
 * An object containing the vulnerability information provided by an Authorized Data Publisher (ADP). Since multiple ADPs can provide information for a CVE ID, an ADP container must indicate which ADP is the source of the information in the object.
 */
export interface AdpContainer {
  providerMetadata: ProviderMetadata;
  /**
   * If known, the date/time the vulnerability was disclosed publicly.
   */
  datePublic?: string;
  /**
   * A title, headline, or a brief phrase summarizing the information in an ADP container.
   */
  title?: string;
  descriptions?: Descriptions;
  affected?: Affected;
  problemTypes?: ProblemTypes;
  references?: References;
  impacts?: Impacts;
  metrics?: Metrics;
  configurations?: Configurations;
  workarounds?: Workarounds;
  solutions?: Solutions;
  exploits?: Exploits;
  timeline?: Timeline;
  credits?: Credits;
  source?: Source;
  tags?: AdpTags;
  taxonomyMappings?: TaxonomyMappings;
  /**
   * This interface was referenced by `AdpContainer`'s JSON-Schema definition
   * via the `patternProperty` "^x_[^.]*$".
   */
  [k: string]: unknown;
}
/**
 * If the CVE ID and associated CVE Record should no longer be used, the CVE Record is placed in the Rejected state. A Rejected CVE Record remains on the CVE List so that users can know when it is invalid.
 */
export interface Rejected {
  dataType: DataType;
  dataVersion: DataVersion;
  cveMetadata: CveMetadataRejected;
  /**
   * A set of structures (called containers) used to store vulnerability information related to a specific CVE ID provided by a specific organization participating in the CVE program. Each container includes information provided by a different source.
   *
   * At minimum, a 'cna' container containing the vulnerability information provided by the CNA who initially assigned the CVE ID must be included.
   *
   * There can only be one 'cna' container, as there can only be one assigning CNA.
   */
  containers: {
    cna: CnaRejectedContainer;
  };
}
/**
 * This is meta data about the CVE ID such as the CVE ID, who requested it, who assigned it, when it was requested, the current state (PUBLISHED, REJECTED, etc.) and so on.  These fields are controlled by the CVE Services.
 */
export interface CveMetadataRejected {
  /**
   * The CVE identifier that this record pertains to.
   */
  cveId: string;
  /**
   * The UUID for the organization to which the CVE ID was originally assigned.
   */
  assignerOrgId: string;
  /**
   * The short name for the organization to which the CVE ID was originally assigned.
   */
  assignerShortName?: string;
  /**
   * The system of record causes this to start at 1, and increment by 1 each time a submission from a data provider changes this CVE Record. The incremented value moves to the Rejected schema upon a PUBLISHED->REJECTED transition, and moves to the Published schema upon a REJECTED->PUBLISHED transition.
   */
  serial?: number;
  /**
   * The date/time the record was last updated.
   */
  dateUpdated?: string;
  /**
   * The date/time the CVE Record was first published in the CVE List.
   */
  datePublished?: string;
  /**
   * The date/time the CVE ID was rejected.
   */
  dateRejected?: string;
  /**
   * State of CVE - PUBLISHED, REJECTED.
   */
  state: "REJECTED";
  /**
   * The date/time this CVE ID was reserved in the CVE automation workgroup services system. Disclaimer: This date reflects when the CVE ID was reserved, and does not necessarily indicate when this vulnerability was discovered, shared with the affected vendor, publicly disclosed, or updated in CVE.
   */
  dateReserved?: string;
}
/**
 * An object containing the vulnerability information provided by a CVE Numbering Authority (CNA) for a rejected CVE ID. There can only be one CNA container per CVE record since there can only be one assigning CNA.
 */
export interface CnaRejectedContainer {
  providerMetadata: ProviderMetadata;
  rejectedReasons: Descriptions2;
  /**
   * Contains an array of CVE IDs that this CVE ID was rejected in favor of because this CVE ID was assigned to the vulnerabilities.
   *
   * @minItems 1
   */
  replacedBy?: [CveId, ...CveId[]];
  /**
   * This interface was referenced by `CnaRejectedContainer`'s JSON-Schema definition
   * via the `patternProperty` "^x_[^.]*$".
   */
  [k: string]: unknown;
}
