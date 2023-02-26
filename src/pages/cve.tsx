import { type NextPage } from "next";
import styles from "./cve.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { validateUnknown } from "../utils/validator";
import Link from "next/link";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  if (typeof id !== "string") {
    return (
      <p>
        Add <code>?id=[someid]</code> to the url
      </p>
    );
  }

  const result =
    typeof id === "string" ? api.example.getCVE.useQuery({ id }) : undefined;
  const isLoading = result?.isLoading;

  const cve = result?.data?.json
    ? validateUnknown(result?.data?.json)
    : undefined;

  const isPublished = cve?.version === 4 && cve.state === "PUBLIC";

  return (
    <>
      <Head>
        <title>{cve ? result?.data?.id : "CVE"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">← Back</Link>
          <p>{isLoading ? "Loading..." : ""}</p>
          {isPublished ? (
            <>
              <h1>{cve.data.CVE_data_meta.ID}</h1>
              <p>
                {`${cve.state} ${cve.data.data_type},
              ${cve.data.data_format} version ${cve.data.data_version}`}
              </p>
              <h2>Description</h2>
              <p>
                {
                  cve.data.description.description_data.find(
                    (s) => s.lang === "eng"
                  )?.value
                }
              </p>
              <p>
                {"(languages: " +
                  cve.data.description.description_data
                    .map((s) => s.lang)
                    .join(", ") +
                  ")"}
              </p>
              <h2>Problem type</h2>
              <p>
                {cve.data.problemtype.problemtype_data.map((p, i) => (
                  <>
                    <p key={i}>
                      {p.description.find((s) => s.lang === "eng")?.value}
                    </p>
                    <p>
                      {"(languages: " +
                        p.description.map((s) => s.lang).join(", ") +
                        ")"}
                    </p>
                  </>
                ))}
              </p>
              <h2>References</h2>
              <ul>
                {cve.data.references.reference_data.map((r, i) => (
                  <li key={i}>
                    <a href={r.url}>{r.url}</a>
                  </li>
                ))}
              </ul>
              <h2>ASSIGNER</h2>
              <p>{cve.data.CVE_data_meta.ASSIGNER}</p>
              <ul>
                {cve.data.affects.vendor.vendor_data.map((vendor) => (
                  <>
                    <li>{vendor.vendor_name}</li>
                    <ul>
                      {vendor.product.product_data.map((product, i) => (
                        <>
                          <li key={i}>{product.product_name}</li>
                          <ul>
                            {product.version.version_data.map((v, i) => (
                              <li key={i}>
                                {`${
                                  typeof v.version_affected === "string"
                                    ? v.version_affected
                                    : ""
                                } ${v.version_value}`}
                              </li>
                            ))}
                          </ul>
                        </>
                      ))}
                    </ul>
                  </>
                ))}
              </ul>
            </>
          ) : (
            <p>No valid CVE found</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
