import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CveV5Pubished } from "../components/CvePublished";
import DataError from "../components/DataError";
import { PageHead } from "../components/PageHead";
import { getCVE, getGithubAdvisories } from "../server/api/api";
import styles from "../styles/cve.module.css";
import { HNSearchHit } from "../types/HNSearch";
import { Published } from "../types/v5-cve";
import { api } from "../utils/api";
import { searchHackerNews } from "../utils/hacker-news";
import {
  addCveOpenGraphData,
  addGithubAdvisoryOpenGraphData,
  OpenGraphData,
} from "../utils/opengraph";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { isDefined, validateCveId } from "../utils/utils";
import { useEffect, useState } from "react";
import { GithubAdvisory } from "../types/GithubAdvisory";
import { sanitizeGithubAdvisories } from "../utils/github-advisories";

type Props = {
  cve?: Published;
  errorMessage?: string;
  hackerNewsHits?: HNSearchHit[];
  githubAdvisories?: GithubAdvisory[];
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

  // Fetch GitHub Security Advisories
  const githubAdvisoriesRequest = getGithubAdvisories(id);

  // Await pending requests
  let [hnSearch, cve, githubAdvisories] = await Promise.all([
    hnRequest,
    cveRequest,
    githubAdvisoriesRequest,
  ]);
  const sanitizedGithubAdvisories = await sanitizeGithubAdvisories(
    githubAdvisories
  );
  if (!cve) return err("Error fetching CVE");
  return {
    props: {
      cve,
      hackerNewsHits: hnSearch?.hits,
      githubAdvisories: sanitizedGithubAdvisories,
    },
  };
};

function Page({
  errorMessage,
  cve,
  hackerNewsHits,
  githubAdvisories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    query: { id },
  } = useRouter();
  const [openGraphData, setOpenGraphData] = useState<Array<OpenGraphData>>([]);

  const { favoriteIds, toggleId } = useFavoriteStorage("favorites");
  const { data: openGraphDataMessage } =
    api.openGraphDataSubscription.useSubscription({
      id: cve?.cveMetadata.cveId ?? "",
    });

  useEffect(() => {
    if (openGraphDataMessage) {
      console.info(
        `Received ${openGraphDataMessage.length} opengraph data items`
      );
      setOpenGraphData((prev) => [
        ...prev,
        ...openGraphDataMessage.filter(isDefined),
      ]);
    }
  }, [openGraphDataMessage]);

  const cveWithOpenGraphData = cve
    ? addCveOpenGraphData(cve, openGraphData)
    : cve;
  const githubAdvisoriesWithOpenGraphData = githubAdvisories?.map((a) =>
    addGithubAdvisoryOpenGraphData(a, openGraphData)
  );

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
            githubAdvisories={githubAdvisoriesWithOpenGraphData ?? []}
          />
        </div>
      </main>
    </>
  );
}

export default Page;
