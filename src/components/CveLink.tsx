import { CVE } from "@prisma/client";
import Link from "next/link";
import styles from "../styles/index.module.css";
import { Published } from "../types/v5-cve";
import { toCve } from "../utils/getCve";

export function CveLink({ cve }: { cve: Published }) {
  // const c = toCve(cve);

  const published = cve.cveMetadata.datePublished
    ? new Date(cve.cveMetadata.datePublished).toDateString()
    : "unknown";

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Link className={styles.link} href={`/${cve.cveMetadata.cveId}`}>
        {cve.cveMetadata.cveId}
      </Link>
      <p className={styles.label}>
        Published {published} by {cve.cveMetadata.assignerShortName}
      </p>
    </div>
  );
}
