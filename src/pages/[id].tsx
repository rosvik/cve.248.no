import Head from "next/head";
import Link from "next/link";
import styles from "../styles/cve.module.css";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CveV5Pubished } from "../components/v5published";
import DataError from "../components/DataError";
import { CveResponse, getCve } from "../utils/getCve";
import { useRouter } from "next/router";

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

  if (errorObject || errorObject || !cve)
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
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">← Back</Link>
          <CveV5Pubished cve={cve}></CveV5Pubished>
        </div>
      </main>
    </>
  );
}

export default Page;
