import styles from "./references.module.css";
import type { Reference } from "../types/v5-cve";
import { Chip } from "./Chip";
import Image from "next/image";

export function References({ references }: { references: Reference[] }) {
  return (
    <div className={styles.referencesList}>
      {references.map((reference, i) => (
        <ReferenceItem reference={reference} key={i} />
      ))}
    </div>
  );
}

function ReferenceItem({ reference }: { reference: Reference }) {
  return (
    <a href={reference.url} className={styles.open_graph_data}>
      {reference.openGraphData?.image && (
        <Image
          src={reference.openGraphData.image}
          width={300}
          height={200}
          alt=""
        />
      )}
      <div className={styles.ogd_content}>
        <h4>{getTitle(reference)}</h4>
        {reference.openGraphData?.description && (
          <p>{reference.openGraphData.description}</p>
        )}
        <p className={styles.url}>{reference.url}</p>
        {reference.tags?.map((tag) => (
          <Chip key={tag}>{`#${tag}`}</Chip>
        ))}
      </div>
    </a>
  );
}

function getTitle(reference: Reference) {
  if (reference.openGraphData?.title) {
    return reference.openGraphData.title;
  } else if (reference.name) {
    return reference.name;
  } else {
    return getDomainName(reference.url);
  }
}

function getDomainName(url: string) {
  const domain = new URL(url).hostname;
  return domain.startsWith("www.") ? domain.slice(4) : domain;
}
