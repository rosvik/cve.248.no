import Link from "next/link";
import styles from "../styles/index.module.css";
import { Published } from "../types/v5-cve";
import { Chip } from "./Chip";
import { getProblemTypes } from "./CvePublished";

export function CveLink({ cve }: { cve: Published }) {
  const published = cve.cveMetadata.datePublished
    ? new Date(cve.cveMetadata.datePublished).toDateString()
    : "unknown";

  const problems = getProblemTypes(cve.containers.cna.problemTypes);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Link className={styles.link} href={`/${cve.cveMetadata.cveId}`}>
        {cve.cveMetadata.cveId}
      </Link>
      <p className={styles.label}>
        Published {published} by {cve.cveMetadata.assignerShortName}
        {problems
          ?.filter((p) => p.cweId)
          .map((p, i) => (
            <Chip key={i}>{`${p.cweId}`}</Chip>
          ))}
      </p>
    </div>
  );
}
