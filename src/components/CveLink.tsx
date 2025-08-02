import Link from "next/link";
import styles from "./CveLink.module.css";
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
