import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  const hello =
    typeof id === "string" ? api.example.getCVE.useQuery({ id }) : undefined;

  return (
    <>
      <Head>
        <title>CVE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>ID: {hello ? hello.data?.id : ""}</p>
        <p>{JSON.stringify(hello?.data?.json)}</p>
      </main>
    </>
  );
};

export default Home;
