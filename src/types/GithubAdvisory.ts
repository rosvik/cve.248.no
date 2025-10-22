import { OpenGraphData } from "../utils/opengraph";

export type GithubAdvisory = {
  /**
   * The GitHub Security Advisory ID.
   */
  ghsa_id: string;
  /**
   * The Common Vulnerabilities and Exposures (CVE) ID.
   */
  cve_id: string | null;
  /**
   * The API URL for the advisory.
   */
  url: string;
  /**
   * The URL for the advisory.
   */
  html_url: string;
  /**
   * The API URL for the repository advisory.
   */
  repository_advisory_url: string | null;
  /**
   * A short summary of the advisory.
   */
  summary: string;
  /**
   * A detailed description of what the advisory entails.
   */
  description: string | null;
  /**
   * The type of advisory.
   */
  type: "reviewed" | "unreviewed" | "malware";
  /**
   * The severity of the advisory.
   */
  severity: "critical" | "high" | "medium" | "low" | "unknown";
  /**
   * The URL of the advisory's source code.
   */
  source_code_location: string | null;
  identifiers:
    | {
        /**
         * The type of identifier.
         */
        type: "CVE" | "GHSA";
        /**
         * The identifier value.
         */
        value: string;
      }[]
    | null;
  references: string[] | null;
  /**
   * The date and time of when the advisory was published, in ISO 8601 format.
   */
  published_at: string;
  /**
   * The date and time of when the advisory was last updated, in ISO 8601 format.
   */
  updated_at: string;
  /**
   * The date and time of when the advisory was reviewed by GitHub, in ISO 8601 format.
   */
  github_reviewed_at: string | null;
  /**
   * The date and time when the advisory was published in the National Vulnerability Database, in ISO 8601 format.
   * This field is only populated when the advisory is imported from the National Vulnerability Database.
   */
  nvd_published_at: string | null;
  /**
   * The date and time of when the advisory was withdrawn, in ISO 8601 format.
   */
  withdrawn_at: string | null;
  /**
   * The products and respective version ranges affected by the advisory.
   */
  vulnerabilities:
    | {
        /**
         * The name of the package affected by the vulnerability.
         */
        package: {
          /**
           * The package's language or package management ecosystem.
           */
          ecosystem:
            | "rubygems"
            | "npm"
            | "pip"
            | "maven"
            | "nuget"
            | "composer"
            | "go"
            | "rust"
            | "erlang"
            | "actions"
            | "pub"
            | "other"
            | "swift";
          /**
           * The unique package name within its ecosystem.
           */
          name: string | null;
        } | null;
        /**
         * The range of the package versions affected by the vulnerability.
         */
        vulnerable_version_range: string | null;
        /**
         * The package version that resolves the vulnerability.
         */
        first_patched_version: string | null;
        /**
         * The functions in the package that are affected by the vulnerability.
         */
        vulnerable_functions: string[] | null;
      }[]
    | null;
  cvss: {
    /**
     * The CVSS vector.
     */
    vector_string: string | null;
    /**
     * The CVSS score.
     */
    score: number | null;
  } | null;
  cvss_severities?: {
    cvss_v3?: {
      /**
       * The CVSS 3 vector string.
       */
      vector_string: string | null;
      /**
       * The CVSS 3 score.
       */
      score: number | null;
    } | null;
    cvss_v4?: {
      /**
       * The CVSS 4 vector string.
       */
      vector_string: string | null;
      /**
       * The CVSS 4 score.
       */
      score: number | null;
    } | null;
  } | null;
  /**
   * The EPSS scores as calculated by the [Exploit Prediction Scoring System](https://www.first.org/epss).
   */
  epss?: {
    percentage?: number;
    percentile?: number;
  } | null;
  cwes:
    | {
        /**
         * The Common Weakness Enumeration (CWE) identifier.
         */
        cwe_id: string;
        /**
         * The name of the CWE.
         */
        name: string;
      }[]
    | null;
  /**
   * The users who contributed to the advisory.
   */
  credits:
    | {
        user: SimpleUser;
        /**
         * The type of credit the user is receiving.
         */
        type:
          | "analyst"
          | "finder"
          | "reporter"
          | "coordinator"
          | "remediation_developer"
          | "remediation_reviewer"
          | "remediation_verifier"
          | "tool"
          | "sponsor"
          | "other";
      }[]
    | null;
  /**
   * Custom: Optional extension with [Open Graph metadata](https://ogp.me/) for the references.
   */
  openGraphData?: Array<OpenGraphData>;
};

/**
 * A GitHub user.
 */
export interface SimpleUser {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
  user_view_type?: string;
}
