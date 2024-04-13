import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { CveLink } from "../components/CveLink";
import { PageHead } from "../components/PageHead";
import { prisma } from "../server/db";
import styles from "../styles/index.module.css";
import { Published } from "../types/v5-cve";
import { api } from "../utils/api";
import { toCve } from "../utils/getCve";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { clamp } from "../utils/utils";
import { isPublished, unsafeIsPublished } from "../utils/validator";

const MAX_NUMBER_OF_FAVORITES = 5;

type Props = {
  recents: Published[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const query = context.query;
  const count = clamp(parseInt(query.count as string) || 10, 1, 200);

  const recentResults = await prisma.cVE.findMany({
    orderBy: {
      cveMetadata_datePublished: "desc",
    },
    where: {
      cveMetadata_datePublished: {
        not: null,
      },
      cveMetadata_state: {
        equals: "PUBLISHED",
      },
    },
    take: count,
  });

  const recents = recentResults
    .map((r) => toCve(r.json).cve)
    .filter(isPublished);

  return {
    props: {
      recents: recents,
    },
  };
};

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ recents }) => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { favoriteIds } = useFavoriteStorage("favorites");

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const v = formatValue(e.target.value);
    setValue(v);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (/^CVE-[0-9]{4}-[0-9]+$/.test(value)) {
      router.push(`/${value}`);
    }
  };

  const favorites = api.prismaRouter.getMany.useQuery({
    ids:
      favoriteIds
        ?.sort((a, b) => b.localeCompare(a))
        ?.slice(0, MAX_NUMBER_OF_FAVORITES + 2) ?? [],
  });

  return (
    <>
      <PageHead />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>cve.248.no</h1>
          <form onSubmit={onSubmit} action="/form">
            <label htmlFor="cveId">Lookup</label>
            <input
              name="cveId"
              placeholder="CVE-0000-00000"
              value={value}
              onChange={onType}
              type="text"
            />
          </form>
          {!!favorites.data?.length && <h3>Favorites</h3>}
          {favorites.data
            ?.toReversed()
            .slice(0, MAX_NUMBER_OF_FAVORITES)
            .map(
              (cve) =>
                unsafeIsPublished(cve.json) && (
                  <CveLink key={cve.id} cve={cve.json} />
                )
            )}
          {!!favorites.data?.length &&
            favorites.data?.length > MAX_NUMBER_OF_FAVORITES && (
              <Link href="/favorites">All favorites →</Link>
            )}
          <h3>Recent</h3>
          {recents?.map(
            (cve) =>
              isPublished(cve) && (
                <CveLink key={cve.cveMetadata.cveId} cve={cve} />
              )
          )}
        </div>
      </main>
    </>
  );
};

function formatValue(value: string) {
  const v = value.toUpperCase();
  if (/^[0-9]+$/.test(v)) {
    // Only numbers
    return `CVE-${v}`;
  } else if (/^CVE-[0-9]{4}-[0-9]+$/.test(v)) {
    // Complete id
    return `${v}`;
  } else if (/^CVE-[0-9]{5,}$/.test(v)) {
    // More than 4 numbers
    return `${v.substring(0, 8)}-${v.substring(8)}`;
  }
  return v;
}

export default Home;
