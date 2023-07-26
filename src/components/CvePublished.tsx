import Link from "next/link";
import styles from "../styles/cve.module.css";
import {
  Affected,
  Descriptions,
  ProblemTypes,
  Published,
} from "../types/v5-cve";
import { Chip } from "./Chip";
import { References } from "./References";

export function CveV5Pubished({ cve }: { cve: Published }) {
  const cna = cve.containers.cna;
  const affectedSystemTypes = getAffectedSystemTypes(cna.affected);
  const problemTypes = getProblemTypes(cna.problemTypes);
  return (
    <>
      <h1>{cve.cveMetadata.cveId}</h1>
      <div className={styles.chipContainer}>
        {affectedSystemTypes.length > 0 && (
          <Chip>{affectedSystemTypes.join(" / ")}</Chip>
        )}
        <Chip>{cve.cveMetadata.state}</Chip>
        <Chip>{cve.dataVersion}</Chip>
        {problemTypes
          ?.filter((p) => p.cweId)
          .map((p, i) => (
            <Chip key={i}>{`${p.cweId}`}</Chip>
          ))}
      </div>
      {cna.title ? <h2 className={styles.title}>{cna.title}</h2> : null}
      <p className={styles.assigner}>{cve.cveMetadata.assignerShortName}</p>

      <p className={styles.description}>{getDescription(cna.descriptions)}</p>

      {problemTypes?.length ? (
        <>
          <h3>Problem type</h3>
          <ul>
            {problemTypes.map((problem, i) => (
              <li key={i}>
                {problem.cweId ? (
                  <Link
                    href={`https://cwe.mitre.org/data/definitions/${
                      problem.cweId.split("-")[1]
                    }.html`}
                  >
                    {problem.description}
                  </Link>
                ) : (
                  problem.description
                )}
                {problem.references && (
                  <References references={problem.references} />
                )}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h3>References</h3>
      <References references={cna.references} />

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

export const getProblemTypes = (problems: ProblemTypes | undefined) => {
  return problems
    ?.map(
      (problem) =>
        problem.descriptions.find((d) =>
          ["en", "eng", "en-US"].includes(d.lang)
        ) || problem.descriptions[0]
    )
    .filter((problems) => problems.description !== "n/a");
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
