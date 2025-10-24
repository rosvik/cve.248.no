import { type NextPage } from "next";
import { CveLink } from "../components/CveLink";
import { PageHead } from "../components/PageHead";
import styles from "../styles/index.module.css";
import { Published } from "../types/v5-cve";
import { api } from "../utils/api";

interface ManyProps {
  ids: string[];
}

const Many: NextPage<ManyProps> = ({ ids }) => {
  const cves = api.getCVEs.useQuery({ ids });

  return cves.isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <PageHead />
      <main className={styles.main}>
        <div className={styles.container}>
          {cves.data?.map(
            (cve) =>
              cve && (
                <CveLink key={cve.cveMetadata.cveId} cve={cve as Published} />
              )
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
