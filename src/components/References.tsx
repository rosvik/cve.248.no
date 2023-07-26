import styles from "./references.module.css";
import { References } from "../types/v5-cve";
import { Chip } from "./Chip";
import Image from "next/image";

export function References({ references }: { references: References }) {
  return (
    <ul className={styles.referencesList}>
      {references.map((r, i) =>
        r.openGraphData ? (
          <a key={i} href={r.url} className={styles.open_graph_data}>
            <p className={styles.url}>{r.url}</p>
            {r.openGraphData.image && (
              <aside>
                <Image
                  src={r.openGraphData.image}
                  width={300}
                  height={200}
                  alt="opengraph image"
                />
              </aside>
            )}
            <h4>{r.openGraphData.title}</h4>
            <p>{r.openGraphData.description}</p>
            {r.tags?.map((tag) => (
              <Chip key={tag}>{`#${tag}`}</Chip>
            ))}
          </a>
        ) : (
          <li key={i}>
            <a href={r.url}>{r.name ? r.name : r.url}</a>{" "}
            {r.tags?.map((tag) => (
              <Chip key={tag}>{`#${tag}`}</Chip>
            ))}
          </li>
        )
      )}
    </ul>
  );
}
