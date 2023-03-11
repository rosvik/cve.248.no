import Head from "next/head";

import Link from "next/link";
import styles from "../styles/index.module.css";

type Props = {
  errorMessage?: string;
  errorObject?: object;
};

function DataError({ errorMessage, errorObject }: Props) {
  const j = errorObject ? JSON.stringify(errorObject, null, 2) : undefined;

  return (
    <>
      <Head>
        <title>CVE - Error</title>
      </Head>

      <div>
        <div className={styles.container}>
          <h1>Something went wrong!</h1>
          <p>{errorMessage}</p>
          {j && (
            <p>
              <pre>{j}</pre>
            </p>
          )}
          <div>
            <Link href="/">← Back</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataError;
