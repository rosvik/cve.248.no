import { type NextPage } from "next";
import Head from "next/head";
import { CveLink } from "../components/CveLink";
import { PageHead } from "../components/PageHead";
import styles from "../styles/index.module.css";
import { api } from "../utils/api";
import { Published } from "../types/v5-cve";

interface ManyProps {
  ids: string[];
}

const Many: NextPage<ManyProps> = ({ ids }) => {
  const cves = api.prismaRouter.getMany.useQuery({ ids });

  console.log(cves.data);

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
                <CveLink key={cve.id} cve={cve.json as unknown as Published} />
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
