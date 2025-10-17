import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CveV5Pubished } from "../components/CvePublished";
import DataError from "../components/DataError";
import { PageHead } from "../components/PageHead";
import { getCVE } from "../server/api/api";
import styles from "../styles/cve.module.css";
import { HNSearchHit } from "../types/HNSearch";
import { Published } from "../types/v5-cve";
import { api } from "../utils/api";
import { searchHackerNews } from "../utils/hacker-news";
import { addOpenGraphData, OpenGraphData } from "../utils/opengraph";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { validateCveId } from "../utils/utils";
import { useEffect, useState } from "react";

type Props = {
  cve?: Published;
  errorMessage?: string;
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

  // Initiate Hacker News search
  const hnRequest = searchHackerNews(id);

  // Fetch CVE
  const cveRequest = getCVE(id);

  // Await pending requests
  let [hnSearch, cve] = await Promise.all([hnRequest, cveRequest]);
  if (!cve) return err("Error fetching CVE");
  return {
    props: {
      cve,
      hackerNewsHits: hnSearch?.hits,
    },
  };
};

function Page({
  errorMessage,
  cve,
  hackerNewsHits,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    query: { id },
  } = useRouter();
  const [openGraphData, setOpenGraphData] = useState<
    Array<OpenGraphData & { url: string }>
  >([]);

  const { favoriteIds, toggleId } = useFavoriteStorage("favorites");
  const { data: openGraphDataMessage } = api.getOpenGraphData.useSubscription({
    urls: cve?.containers.cna.references?.map((r) => r.url) ?? [],
  });

  useEffect(() => {
    if (openGraphDataMessage) {
      console.info(
        `Received ${openGraphDataMessage.length} opengraph data items`
      );
      setOpenGraphData((prev) => [...prev, ...openGraphDataMessage]);
    }
  }, [openGraphDataMessage]);

  const cveWithOpenGraphData = cve ? addOpenGraphData(cve, openGraphData) : cve;

  const handleAddClick = () => {
    if (typeof id !== "string") return;
    toggleId(id);
  };

  const validId = typeof id === "string";
  if (!cveWithOpenGraphData || !validId)
    return (
      <DataError
        id={typeof id === "string" ? id : undefined}
        errorMessage={errorMessage}
      />
    );

  return (
    <>
      <PageHead title={cveWithOpenGraphData.cveMetadata.cveId} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link href="/">← Back</Link>
            <button className={styles.saveButton} onClick={handleAddClick}>
              {favoriteIds?.includes(id) ? "★" : "☆"}
            </button>
          </div>
          <CveV5Pubished
            cve={cveWithOpenGraphData}
            hackerNewsHits={hackerNewsHits}
          />
        </div>
      </main>
    </>
  );
}

export default Page;
