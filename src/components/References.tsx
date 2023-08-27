import styles from "./references.module.css";
import { Reference, References } from "../types/v5-cve";
import { Chip } from "./Chip";
import Image from "next/image";

export function References({ references }: { references: References }) {
  return (
    <div className={styles.referencesList}>
      {references.map((o, i) => (
        <a key={i} href={o.url} className={styles.open_graph_data}>
          {o.openGraphData?.image && (
            <Image
              src={o.openGraphData.image}
              width={300}
              height={200}
              alt=""
            />
          )}
          <div className={styles.ogd_content}>
            <h4>{getTitle(o)}</h4>
            {o.openGraphData?.description && (
              <p>{o.openGraphData.description}</p>
            )}
            <p className={styles.url}>{o.url}</p>
            {o.tags?.map((tag) => (
              <Chip key={tag}>{`#${tag}`}</Chip>
            ))}
          </div>
        </a>
      ))}
    </div>
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
