import ajv from "ajv";
import Head from "next/head";
import Link from "next/link";
import { validateUnknown } from "../utils/validator";
import styles from "../styles/cve.module.css";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CVE_Option } from "../types/generic-cve";
import { CveV5Pubished } from "../components/v5published";
import DataError from "../components/DataError";

type Props = {
  data?: {
    id: string;
    cve: CVE_Option;
  };
  errorObject?: ajv.ErrorObject[];
  errorMessage?: string;
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
  if (errorObject || errorObject || !data)
    return <DataError errorMessage={errorMessage} errorObject={errorObject} />;

  const { cve } = data;
  const isPublished = cve.version === 5 && cve.state === "PUBLISHED";
  if (!isPublished)
    return <DataError errorMessage="CVE is not published, or is not v5" />;

  return (
    <>
      <Head>
        <title>{cve.data.cveMetadata.cveId}</title>
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
