import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CveV5Pubished } from "../components/CvePublished";
import DataError from "../components/DataError";
import { PageHead } from "../components/PageHead";
import { prisma } from "../server/db";
import styles from "../styles/cve.module.css";
import { HNSearchHit } from "../types/HNSearch";
import { injectOpengraphData } from "../utils/fetch-opengraph-data";
import { CveResponse, toCve } from "../utils/getCve";
import { searchHackerNews } from "../utils/searchHackerNews";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { validateCveId } from "../utils/utils";
import { isPublished } from "../utils/validator";

type Props = CveResponse & {
  hackerNewsHits?: HNSearchHit[];
};
const err = (m: string) => ({ props: { errorMessage: m } });

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = context.query;
  if (!(typeof query.id === "string")) return err("Error parsing ID");
  const id = query.id.toUpperCase();

  if (!validateCveId(id)) return err("Invalid CVE ID");

  // Fetch CVE from DB
  const response = await prisma.cVE.findUnique({ where: { id } });

  // Parse and validate CVE
  if (!response) return err("Error fetching CVE");
  const cve = toCve(response.json).cve;
  if (!cve) return err("Error parsing CVE");
  if (!isPublished(cve)) return err("CVE is not published");

  // Populate references with OpenGraph data
  const odgRequest = injectOpengraphData(cve.containers.cna.references);

  // Fetch Hacker News results
  const hnRequest = searchHackerNews(id);

  let [_odg, hnSearch] = await Promise.all([odgRequest, hnRequest]);

  return {
    props: {
      cve,
      hackerNewsHits: hnSearch?.hits,
    },
  };
};

function Page({
  cve,
  errorMessage,
  errorObject,
  hackerNewsHits,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    query: { id },
  } = useRouter();

  const { favoriteIds, toggleId } = useFavoriteStorage("favorites");

  const handleAddClick = () => {
    if (typeof id !== "string") return;
    toggleId(id);
  };

  const validId = typeof id === "string";
  if (errorObject || errorObject || !cve || !validId)
    return (
      <DataError
        id={typeof id === "string" ? id : undefined}
        errorMessage={errorMessage}
        errorObject={errorObject}
      />
    );

  return (
    <>
      <PageHead title={cve.cveMetadata.cveId} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link href="/">← Back</Link>
            <button className={styles.saveButton} onClick={handleAddClick}>
              {favoriteIds?.includes(id) ? "★" : "☆"}
            </button>
          </div>
          {isPublished(cve) && (
            <CveV5Pubished cve={cve} hackerNewsHits={hackerNewsHits} />
          )}
        </div>
      </main>
    </>
  );
}

export default Page;
