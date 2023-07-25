import Head from "next/head";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import styles from "../styles/saved.module.css";
import { useFavoriteStorage } from "../utils/use-favorite-storage";

function Page({}) {
  const { favorites } = useFavoriteStorage("favorites");

  return (
    <>
      <PageHead title="cve.248.no - Saved items" />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link href="/">← Back</Link>
          </div>
          <h1>Saved CVEs</h1>
          {favorites?.map((x) => (
            <p key={x}>
              <Link className={styles.link} href={`/${x}`}>
                {x}
              </Link>
            </p>
          ))}
        </div>
      </main>
    </>
  );
}

export default Page;
