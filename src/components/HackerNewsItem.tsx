import Link from "next/link";
import { HNSearchHit } from "../types/HNSearch";
import { trimString } from "../utils/utils";
import styles from "./HackerNewsItem.module.css";

export function HackerNewsItem({ item }: { item: HNSearchHit }) {
  if (item._tags.includes("story"))
    return (
      <div className={styles.container}>
        <b className={styles.header}>
          <Link href={`https://news.ycombinator.com/item?id=${item.objectID}`}>
            {item.title}
          </Link>
        </b>
        {item.url && (
          <Link className={styles.url} href={item.url}>
            {item.url}
          </Link>
        )}
        <div className={styles.metadata}>
          <span>
            {`${item.points} points | ${item.author} | ${item.created_at} | ${item.num_comments} comments`}
          </span>
        </div>
      </div>
    );

  if (item._tags.includes("comment"))
    return (
      <div className={styles.comment}>
        <div className={styles.metadata}>
          <a href={`https://news.ycombinator.com/item?id=${item.objectID}`}>{`${
            item.author
          } | ${item.created_at} | on: ${
            item.story_title ? trimString(item.story_title, 40) : "unknown"
          }`}</a>
        </div>
        {item.comment_text && (
          <div
            className={styles.comment_text}
            // NOTE: This is sanitized server side. See src/utils/searchHackerNews.ts
            dangerouslySetInnerHTML={{ __html: item.comment_text }}
          />
        )}
      </div>
    );

  return null;
}
