import { type NextPage } from "next";
import Head from "next/head";
import { CveLink } from "../components/CveLink";
import { PageHead } from "../components/PageHead";
import styles from "../styles/index.module.css";
import { api } from "../utils/api";

interface ManyProps {
  ids: string[];
}

const Many: NextPage<ManyProps> = ({ ids }) => {
  const recents = api.api.getManyCVEs.useQuery({ ids });

  return recents.isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <PageHead />
      <main className={styles.main}>
        <div className={styles.container}>
          {recents.data?.map(
            (recent) =>
              recent && <CveLink key={recent.cveMetadata.cveId} cve={recent} />
          )}
        </div>
      </main>
    </>
  );
};

Many.getInitialProps = async ({ query }) => {
  let { ids } = query;
  const fallback = { ids: [] };
  if (typeof ids === "string") ids = [ids];
  if (!Array.isArray(ids)) return fallback;
  if (ids.length > 200) return fallback;
  if (ids.length < 1) return fallback;
  return { ids };
};

export default Many;
