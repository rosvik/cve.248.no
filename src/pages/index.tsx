import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/index.module.css";

const Home: NextPage = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const v = formatValue(e.target.value);
    setValue(v);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (/^CVE-[0-9]{4}-[0-9]+$/.test(value)) {
      router.push(`/${value}`);
    }
  };

  return (
    <>
      <Head>
        <title>cve.248.no</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>cve.248.no</h1>
          <form onSubmit={onSubmit} action="/form">
            <label htmlFor="cveId">Lookup</label>
            <input
              name="cveId"
              placeholder="CVE-0000-00000"
              value={value}
              onChange={onType}
              type="text"
            />
          </form>
          <div>
            <h3>Examples</h3>
            <p>
              <Link className={styles.link} href="/CVE-2021-30900">
                CVE-2021-30900
              </Link>
            </p>
            <p>
              <Link className={styles.link} href="/CVE-2022-41099">
                CVE-2022-41099
              </Link>
            </p>
            <p>
              <Link className={styles.link} href="/CVE-2023-24482">
                CVE-2023-24482
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

function formatValue(value: string) {
  const v = value.toUpperCase();
  if (/^[0-9]+$/.test(v)) {
    // Only numbers
    return `CVE-${v}`;
  } else if (/^CVE-[0-9]{4}-[0-9]+$/.test(v)) {
    // Complete id
    return `${v}`;
  } else if (/^CVE-[0-9]{5,}$/.test(v)) {
    // More than 4 numbers
    return `${v.substring(0, 8)}-${v.substring(8)}`;
  }
  return v;
}

export default Home;
