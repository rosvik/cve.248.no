import Link from "next/link";
import type { CVE5 } from "../../../types/generic-cve";
import type { Published } from "../../../types/v5-cve";
import { validateUnknown } from "../../../utils/validator";
import styles from "../cve.module.css";

async function getData(id: string) {
  const url = `https://cveawg.mitre.org/api/cve/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");

  const cve = validateUnknown(await res.json());
  if (!cve) throw new Error("Unknown error parsing data.");
  if (Array.isArray(cve)) {
    throw new Error("Invalid JSON format\n" + JSON.stringify(cve, null, 2));
  }
  if (cve.version !== 5) throw new Error("Unsupported data version");

  return cve.data as CVE5;
}

export default async function Page({ params }: { params: { cveId: string } }) {
  const id = params.cveId;

  if (!id)
    return (
      <main className={styles.main}>
        <p>Could not find CVE</p>
      </main>
    );

  const cveData = await getData(id);

  const isPublished = cveData.cveMetadata.state === "PUBLISHED";

  if (!isPublished)
    return (
      <main className={styles.main}>
        <p>Non-published CVEs not supported</p>
      </main>
    );

  const cve = cveData as Published;
  const cna = cve.containers.cna;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/">← Back</Link>
        <>
          <h1>{cve.cveMetadata.cveId}</h1>
          <p>
            {`${cve.cveMetadata.state} ${cve.cveMetadata.assignerOrgId},
              ${cve.dataType} version ${cve.dataVersion}`}
          </p>
          <h2>Description</h2>
          <p>
            {
              JSON.stringify(
                cna.descriptions.find((s) => s.lang === "en")?.value
              )
              // .description_data.find(
              //   (s) => s.lang === "eng"
              // )?.value
            }
          </p>
          {/* <p>
              {"(languages: " +
                cve.data.description.description_data
                  .map((s) => s.lang)
                  .join(", ") +
                ")"}
            </p> */}
          <h2>Problem type</h2>
          {/* <p>
              {cna.problemTypes?.map((p, i) => (
                <>
                  <p key={i}>
                    {p.descriptions.find((s) => s.lang === "eng")?.value}
                  </p>
                  <p>
                    {"(languages: " +
                      p.description.map((s) => s.lang).join(", ") +
                      ")"}
                  </p>
                </>
              ))}
            </p> */}
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
          {/* <ul>
              { affects.vendor.vendor_data.map((vendor) => (
                <>
                  <li>{vendor.vendor_name}</li>
                  <ul>
                    {vendor.product.product_data.map((product, i) => (
                      <>
                        <li key={i}>{product.product_name}</li>
                        <ul>
                          {product.version.version_data.map((v, i) => {
                            if (!v.version_value) return;
                            return (
                              <li key={i}>
                                {`${
                                  typeof v.version_affected === "string"
                                    ? v.version_affected
                                    : ""
                                } ${v.version_value}`}
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ))}
                  </ul>
                </>
              ))}
            </ul> */}
          <h2>JSON</h2>
          <pre>{JSON.stringify(cve, null, 2)}</pre>
        </>
      </div>
    </main>
  );
}
