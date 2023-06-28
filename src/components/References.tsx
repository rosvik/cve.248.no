import styles from "../styles/cve.module.css";
import { References } from "../types/v5-cve";
import { Chip } from "./Chip";

export function References({ references }: { references: References }) {
  return (
    <ul className={styles.referencesList}>
      {references.map((r, i) => (
        <li key={i}>
          <a href={r.url}>{r.name ? r.name : r.url}</a>{" "}
          {r.tags?.map((tag) => (
            <Chip key={tag}>{`#${tag}`}</Chip>
          ))}
        </li>
      ))}
    </ul>
  );
}
