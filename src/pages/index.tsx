import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { CveLink } from "../components/CveLink";
import { PageHead } from "../components/PageHead";
import styles from "../styles/index.module.css";
import { Published } from "../types/v5-cve";
import { api } from "../utils/api";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { clamp, isPublished } from "../utils/utils";
import { Chip } from "../components/Chip";

const MAX_NUMBER_OF_FAVORITES = 5;

type Props = {};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {},
  };
};

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const {
    query: { count },
  } = useRouter();

  const c = clamp(parseInt(count as string) || 10, 1, 200);
  const { data: recents } = api.getRecentCVE.useQuery({ count: c });

  const [value, setValue] = useState("");
  const router = useRouter();
  const { favoriteIds } = useFavoriteStorage("favorites");

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const v = formatValue(e.target.value);
    setValue(v);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isCVEid(value)) {
      router.push(`/${value}`);
    } else {
      router.push(`/search?query=${value}`);
    }
  };

  const favorites = api.getCVEs.useQuery({
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
          <header>
            <h1>cve.248.no</h1>
          </header>
          <form onSubmit={onSubmit} action="/form">
            <label htmlFor="cveId">
              <h2>Search</h2>
            </label>
            <input
              name="cveId"
              placeholder="CVE-0000-00000"
              value={value}
              onChange={onType}
              type="text"
              autoFocus={true}
            />
          </form>
          {!!favorites.data?.length && <h3>Favorites</h3>}
          {favorites.data
            ?.toReversed()
            .slice(0, MAX_NUMBER_OF_FAVORITES)
            .map((cve) => (
              <CveLink key={cve.cveMetadata.cveId} cve={cve as Published} />
            ))}
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
  if (/^[0-9]{4}$/.test(v)) {
    if (parseInt(v) < 2050 && parseInt(v) > 1980) {
      return `CVE-${v}`;
    }
  } else if (isCVEid(v)) {
    // Complete id
    return `${v}`;
  } else if (/^CVE-[0-9]{5,}$/.test(v)) {
    // More than 4 numbers
    return `${v.substring(0, 8)}-${v.substring(8)}`;
  }
  return value;
}
const isCVEid = (value: string) => /^CVE-[0-9]{4}-[0-9]+$/.test(value);

export default Home;
