import Link from "next/link";
import { Published } from "../types/v5-cve";
import { formatDate, isDefined } from "../utils/utils";
import { Chip } from "./Chip";
import styles from "./CveLink.module.css";
import { getProblemTypes } from "./CvePublished";

export function CveLink({ cve }: { cve: Published }) {
  const published = cve.cveMetadata.datePublished
    ? formatDate(cve.cveMetadata.datePublished)
    : "unknown";

  const problems = getProblemTypes(cve.containers.cna.problemTypes);
  const title = cve.containers.cna.title;

  return (
    <Link className={styles.container} href={`/${cve.cveMetadata.cveId}`}>
      <div className={styles.header}>
        <b>{cve.cveMetadata.cveId}</b>
        {problems
          ?.filter(isDefined)
          .filter((p) => p.cweId)
          .map((p, i) => (
            <Chip key={i} color="light-gray">{`${p.cweId}`}</Chip>
          ))}
      </div>
      {title && <p className={styles.title}>{title}</p>}
      <p className={styles.label}>
        Published {published} by {cve.cveMetadata.assignerShortName}
      </p>
    </Link>
  );
}
