import Link from "next/link";
import styles from "../styles/index.module.css";
import { Published } from "../types/v5-cve";
import { Chip } from "./Chip";
import { getProblemTypes } from "./CvePublished";
import { formatDate, isDefined } from "../utils/utils";

export function CveLink({ cve }: { cve: Published }) {
  const published = cve.cveMetadata.datePublished
    ? formatDate(cve.cveMetadata.datePublished)
    : "unknown";

  const problems = getProblemTypes(cve.containers.cna.problemTypes);
  const title = cve.containers.cna.title;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div className={styles.header}>
        <Link className={styles.link} href={`/${cve.cveMetadata.cveId}`}>
          {cve.cveMetadata.cveId}
        </Link>
        {problems
          ?.filter(isDefined)
          .filter((p) => p.cweId)
          .map((p, i) => (
            <Chip key={i} color="light-gray">{`${p.cweId}`}</Chip>
          ))}
      </div>
      {title && <p className={styles.linkTitle}>{title}</p>}
      <p className={styles.label}>
        Published {published} by {cve.cveMetadata.assignerShortName}
      </p>
    </div>
  );
}
