import { Affected, Descriptions, Published } from "../types/v5-cve";
import styles from "../styles/cve.module.css";
import { Chip } from "./Chip";

export function CveV5Pubished({ cve }: { cve: Published }) {
  const cna = cve.containers.cna;
  const affectedSystemTypes = getAffectedSystemTypes(cna.affected);
  return (
    <>
      <h1>{cve.cveMetadata.cveId}</h1>
      <div className={styles.chipContainer}>
        {affectedSystemTypes.length > 0 && (
          <Chip>{affectedSystemTypes.join(" / ")}</Chip>
        )}
        <Chip>{cve.cveMetadata.state}</Chip>
        <Chip>{`${cve.dataVersion}`}</Chip>
      </div>
      {cna.title ? <h2>{cna.title}</h2> : null}
      <p className={styles.description}>{getDescription(cna.descriptions)}</p>
      <h3>References</h3>
      <ul className={styles.referencesList}>
        {cna.references.map((r, i) => (
          <li key={i}>
            <a href={r.url}>{r.name ? r.name : r.url}</a>{" "}
            {r.tags?.map((tag) => (
              <Chip key={tag}>{`#${tag}`}</Chip>
            ))}
          </li>
        ))}
      </ul>
      <h3>Assigner</h3>
      <p>{cve.cveMetadata.assignerShortName}</p>
      <h3>JSON</h3>
      <pre className={styles.code}>{JSON.stringify(cve, null, 2)}</pre>
    </>
  );
}

const getDescription = (descriptions: Descriptions) => {
  const description = descriptions.find((s) =>
    ["en", "eng", "en-US"].includes(s.lang)
  )?.value;
  return description || descriptions[0].value;
};

/**
 * Get type of affected products based on CPE. For details, see
 * https://www.acunetix.com/blog/articles/common-platform-enumeration-cpe-explained/
 */
const getAffectedSystemTypes = (affected: Affected): string[] => {
  const cpes = affected.flatMap((a) => a.cpes);
  const segments = cpes.map((s) => s?.split(":"));
  const duplicates = segments.map((s) =>
    s && s[2]?.length === 1 ? s[2] : null
  );
  const affectedTypes = [...new Set(duplicates)];

  return affectedTypes
    .map((t) => {
      switch (t) {
        case "o":
          return "Operating system";
        case "h":
          return "Hardware";
        case "a":
          return "Application";
        default:
          return undefined;
      }
    })
    .filter(Boolean) as string[];
};
