import ajv from "ajv";
import Head from "next/head";
import Link from "next/link";
import { validateUnknown } from "../utils/validator";
import styles from "../styles/cve.module.css";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CVE_Option } from "../types/generic-cve";
import { CveV5Pubished } from "../components/v5published";

type Props = {
  data?: {
    id: string;
    cve: CVE_Option;
  };
  errorObject?: ajv.ErrorObject[];
  errorMessage?: string | null;
};

const err = (m: string) => ({ props: { errorMessage: m } });

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  if (!(typeof id === "string")) return err("Error parsing ID");

  const result = await fetch(`https://cveawg.mitre.org/api/cve/${id}`);
  if (!result.ok) return err("Request failed");

  const cve = result ? validateUnknown(await result.json()) : undefined;
  if (!cve) return err("Could not validate CVE");
  if (Array.isArray(cve)) return { props: { errorObject: cve } };

  return {
    props: {
      data: {
        id: id,
        cve: cve,
      },
      error: null,
    },
  };
};

function Page({
  data,
  errorMessage,
  errorObject,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (errorObject) {
    return (
      <>
        <Head>
          <title>CVE</title>
        </Head>

        <p>Error parsing CVE</p>
        <pre>{JSON.stringify(errorObject, null, 2)}</pre>
      </>
    );
  }
  if (errorMessage || !data) {
    return (
      <>
        <Head>
          <title>CVE</title>
        </Head>

        <p>{errorMessage || ""}</p>
        {!data ? <p>No data returned</p> : undefined}
      </>
    );
  }

  const { cve, id } = data;
  const isPublished = cve.version === 5 && cve.state === "PUBLISHED";
  if (!isPublished) {
    return (
      <>
        <Head>
          <title>CVE</title>
        </Head>

        <p>No valid CVE found</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{id}</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">← Back</Link>
          <CveV5Pubished cve={cve.data}></CveV5Pubished>
        </div>
      </main>
    </>
  );
}

export default Page;
