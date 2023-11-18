import styles from "../../styles/cwe.module.css";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import DataError from "../../components/DataError";
import { Published } from "../../types/v5-cve";
import { prisma } from "../../server/db";
import { PageHead } from "../../components/PageHead";
import { getCweIds } from "../../utils/utils";
import Link from "next/link";

type Props = {
  id?: string;
  errorMessage?: string;
  withSameCwe?: Published[];
};
const err = (m: string) => ({ props: { errorMessage: m } });

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = context.query;
  if (!(typeof query.id === "string")) return err("Error parsing ID");
  const id = `CWE-${query.id}`;

  const direct = await prisma.cVE.findMany({
    where: {
      cwe_ids: {
        has: id,
      },
    },
    orderBy: {
      cveMetadata_datePublished: "desc",
    },
    take: 20,
  });

  if (!direct) {
    return {
      props: {
        errorMessage: `Error fetching any CWEs with id ${id}`,
      },
    };
  }

  return {
    props: {
      id,
      withSameCwe: direct.map((r) => r.json) as unknown as Published[],
    },
  };
};

function Page({
  withSameCwe,
  errorMessage,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!id || errorMessage) return <DataError errorMessage={errorMessage} />;

  return (
    <>
      <PageHead title={id} />
      <main className={styles.main}>
        <h1>{id}</h1>
        <div className={styles.panel}>
          <div className={styles.panel__header}>
            <h5>CVEs with {id}</h5>
          </div>
          {withSameCwe?.map((cve) => (
            <CveSection cve={cve} key={cve.cveMetadata.cveId} />
          ))}
        </div>
      </main>
    </>
  );
}

function CveSection({ cve }: { cve: Published }) {
  const id = cve.cveMetadata.cveId;
  const date = cve.cveMetadata.datePublished
    ? new Date(cve.cveMetadata.datePublished).toDateString()
    : "unknown";

  const cweIds = getCweIds(cve);
  const cwes = (
    <span>
      {cweIds.map((cwe) => (
        <a key={cwe} href={`/cwe/${cwe}`}>
          {cwe}
        </a>
      ))}
    </span>
  );

  return (
    <a href={`/${id}`}>
      <p>{`${id} by ${cve.cveMetadata.assignerShortName}`}</p>
      {cve.containers.cna.title && (
        <p>
          <b>{cve.containers.cna.title}</b>
        </p>
      )}
      <p className={styles.subheading}>
        <span>
          Published {date} - {cweIds.join(", ")}
        </span>
      </p>
    </a>
  );
}

export default Page;
