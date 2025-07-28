import Head from "next/head";

import Link from "next/link";
import styles from "../styles/cve.module.css";

type Props = {
  id?: string;
  errorMessage?: string;
};

function DataError({ id, errorMessage }: Props) {
  const url = id
    ? new URL(`https://cveawg.mitre.org/api/cve/${id}`)
    : undefined;

  return (
    <>
      <Head>
        <title>CVE - Error</title>
      </Head>

      <main className={styles.main}>
        <div>
          <div className={styles.container}>
            <div>
              <Link href="/">← Back</Link>
            </div>
            <h1>Something went wrong!</h1>
            <p>{errorMessage}</p>
            {url && (
              <p>
                You can try to look for the JSON record at{" "}
                <a href={url.href}>{url.href}</a>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default DataError;
