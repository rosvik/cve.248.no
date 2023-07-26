import styles from "./references.module.css";
import { References } from "../types/v5-cve";
import { Chip } from "./Chip";
import Image from "next/image";

export function References({ references }: { references: References }) {
  const openGraphReferences = references.map(
    (o, i) =>
      o.openGraphData && (
        <a key={i} href={o.url} className={styles.open_graph_data}>
          <p className={styles.url}>{o.url}</p>
          {o.openGraphData.image && (
            <aside>
              <Image
                src={o.openGraphData.image}
                width={300}
                height={200}
                alt="opengraph image"
              />
            </aside>
          )}
          <h4>{o.openGraphData.title}</h4>
          <p>{o.openGraphData.description}</p>
          {o.tags?.map((tag) => (
            <Chip key={tag}>{`#${tag}`}</Chip>
          ))}
        </a>
      )
  );

  const otherReferences = references.map((r, i) =>
    !r.openGraphData ? (
      <li key={i}>
        <a href={r.url}>{r.name ? r.name : r.url}</a>{" "}
        {r.tags?.map((tag) => (
          <Chip key={tag}>{`#${tag}`}</Chip>
        ))}
      </li>
    ) : undefined
  );

  return (
    <>
      {otherReferences.filter(Boolean).length > 0 && <ul>{otherReferences}</ul>}
      {openGraphReferences}
    </>
  );
}
