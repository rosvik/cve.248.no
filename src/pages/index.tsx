import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { CveLink } from "../components/CveLink";
import { PageHead } from "../components/PageHead";
import styles from "../styles/index.module.css";
import { api } from "../utils/api";
import { isPublished } from "../utils/validator";

interface HomeProps {
  count: number;
}

const Home: NextPage<HomeProps> = ({ count }) => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const recents = api.example.getRecentCVE.useQuery({ count });

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
      <PageHead />
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
          <h3>Recent</h3>
          {recents.data?.map(
            (recent) =>
              isPublished(recent.cve) && (
                <CveLink key={recent.cve.cveMetadata.cveId} cve={recent.cve} />
              )
          )}
        </div>
      </main>
    </>
  );
};

Home.getInitialProps = async ({ query }) => {
  const { count } = query;
  const fallback = { count: 10 };

  if (typeof count === "string" && parseInt(count)) {
    const input = parseInt(count);
    if (input > 200) return fallback;
    if (input < 1) return fallback;
    return {
      count: parseInt(count),
    };
  }
  return fallback;
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
