import { Published } from "../types/v5-cve";
import styles from "../styles/cve.module.css";

export function CveV5Pubished({ cve }: { cve: Published }) {
  const cna = cve.containers.cna;
  return (
    <>
      <h1>{cve.cveMetadata.cveId}</h1>
      <p>{`v${cve.dataVersion} ${cve.cveMetadata.state}`}</p>
      <h2>Description</h2>
      <p>{cna.descriptions.find((s) => s.lang === "en")?.value}</p>
      <h2>References</h2>
      <ul>
        {cna.references.map((r, i) => (
          <li key={i}>
            <a href={r.url}>{r.url}</a>
          </li>
        ))}
      </ul>
      <h2>ASSIGNER</h2>
      <p>
        {cve.cveMetadata.assignerShortName} {cve.cveMetadata.assignerOrgId}
      </p>
      <h2>JSON</h2>
      <pre className={styles.code}>{JSON.stringify(cve, null, 2)}</pre>
    </>
  );
}
