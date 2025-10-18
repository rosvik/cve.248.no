import Link from "next/link";
import { GithubAdvisory } from "../types/GithubAdvisory";
import styles from "./GithubAdvisoryItem.module.css";
import { References } from "./References";

type Props = {
  advisory: GithubAdvisory;
  cveId: string;
};
export function GithubAdvisoryItem({ advisory, cveId }: Props) {
  const otherCves = advisory.identifiers
    ?.filter(
      (i) => i.type === "CVE" && i.value.toLowerCase() !== cveId.toLowerCase()
    )
    .map((i) => i.value);

  return (
    <div>
      <h3>{advisory.ghsa_id}</h3>
      <p>{advisory.summary}</p>
      <a href={advisory.html_url}>{advisory.html_url}</a>
      {otherCves && otherCves.length > 0 && <p>Other CVEs:</p>}
      {otherCves?.map((i) => (
        <Link href={`/${i.toUpperCase()}`} key={i}>
          {i}
        </Link>
      ))}
      {advisory.description && (
        <div
          className={styles.description}
          // NOTE: This is sanitized server side
          dangerouslySetInnerHTML={{ __html: advisory.description }}
        />
      )}
      {advisory.openGraphData && (
        <References references={advisory.openGraphData} />
      )}
    </div>
  );
}
