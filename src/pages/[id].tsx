import Head from "next/head";
import Link from "next/link";
import styles from "../styles/cve.module.css";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CveV5Pubished } from "../components/CvePublished";
import DataError from "../components/DataError";
import { CveResponse, getCve } from "../utils/getCve";
import { useRouter } from "next/router";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { useEffect, useState } from "react";
import { fetchOpenGraphData } from "../utils/fetch-opengraph-data";
import { isPublished } from "../utils/validator";
import { PageHead } from "../components/PageHead";
import { searchHackerNews } from "../utils/searchHackerNews";
import { HNSearchHit } from "../types/HNSearch";

type Props = CveResponse & {
  hackerNewsHits?: HNSearchHit[];
};
const err = (m: string) => ({ props: { errorMessage: m } });

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  if (!(typeof id === "string")) return err("Error parsing ID");
  const response = await getCve(id);
  if (!isPublished(response.cve)) return err("CVE is rejected");

  response.cve
    ? await Promise.all(
        response.cve.containers.cna.references.map(async (d) => {
          const ogd = await fetchOpenGraphData(d.url);
          if (ogd) {
            d.openGraphData = ogd;
          }
          return ogd;
        })
      )
    : [];

  const hackerNewsResults = await searchHackerNews(id);
  const hackerNewsHits = hackerNewsResults?.hits;

  return {
    props: {
      ...response,
      hackerNewsHits,
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

  const { favorites, toggleId } = useFavoriteStorage("favorites");

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
              {favorites?.includes(id) ? "★" : "☆"}
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
