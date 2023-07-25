import Head from "next/head";
import Link from "next/link";
import styles from "../styles/cve.module.css";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PageHead } from "../components/PageHead";

type Props = {
  message: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { cveId } = context.query;
  if (!(typeof cveId === "string"))
    return {
      props: {
        message: "Error: Invalid form data",
      },
    };

  if (!/^CVE-[0-9]{4}-[0-9]+$/.test(cveId))
    return {
      props: {
        message: "Error: Invalid ID",
      },
    };

  return {
    redirect: {
      permanent: false,
      destination: `/${cveId}`,
    },
  };
};

function Page({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHead />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">← Back</Link>
          <p>{message}</p>
        </div>
      </main>
    </>
  );
}

export default Page;
