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

type Props = CveResponse;
const err = (m: string) => ({ props: { errorMessage: m } });

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  if (!(typeof id === "string")) return err("Error parsing ID");

  const response = await getCve(id);

  return {
    props: response,
  };
};

function Page({
  cve,
  errorMessage,
  errorObject,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    query: { id },
  } = useRouter();

  const { favorites, toggleId } = useFavoriteStorage("favorites");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof id !== "string" || !favorites) return;
    setIsSaved(favorites.includes(id));
  }, [favorites, id]);

  const handleAddClick = () => {
    if (typeof id !== "string") return;
    console.log(favorites);
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
      <Head>
        <title>{cve.cveMetadata.cveId}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link href="/">← Back</Link>
            <button className={styles.saveButton} onClick={handleAddClick}>
              {isSaved ? "★" : "☆"}
            </button>
          </div>
          <CveV5Pubished cve={cve}></CveV5Pubished>
        </div>
      </main>
    </>
  );
}

export default Page;
