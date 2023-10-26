import Link from "next/link";
import { HNSearchHit } from "../types/HNSearch";
import styles from "./HackerNewsItem.module.css";

export function HackerNewsItem({ item }: { item: HNSearchHit }) {
  return (
    <div className={styles.container}>
      <h4 className={styles.header}>
        <Link href={`https://news.ycombinator.com/item?id=${item.objectID}`}>
          {item.title}
        </Link>
      </h4>
      <Link className={styles.url} href={item.url}>
        {item.url}
      </Link>
      <div className={styles.metadata}>
        <span>
          {`${item.points} points | ${item.author} | ${item.created_at} | ${item.num_comments} comments`}
        </span>
      </div>
    </div>
  );
}
