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
import { searchHackerNews } from "../utils/hacker-news";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { validateCveId } from "../utils/utils";
import { GithubAdvisory } from "../types/GithubAdvisory";
import { sanitizeGithubAdvisories } from "../utils/github-advisories";
import { githubAdvisoriesKey, cached } from "../server/redis";

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
  const ghsaKey = githubAdvisoriesKey(id);
  const githubAdvisoriesRequest = cached(ghsaKey, () =>
    getGithubAdvisories(id)
  );

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
  const { favoriteIds, toggleId } = useFavoriteStorage("favorites");

  const handleAddClick = () => {
    if (typeof id !== "string") return;
    toggleId(id);
  };

  const validId = typeof id === "string";
  if (!cve || !validId)
    return (
      <DataError
        id={typeof id === "string" ? id : undefined}
        errorMessage={errorMessage}
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
          <CveV5Pubished
            cve={cve}
            hackerNewsHits={hackerNewsHits}
            githubAdvisories={githubAdvisories}
          />
        </div>
      </main>
    </>
  );
}

export default Page;
