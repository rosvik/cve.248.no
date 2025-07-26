import Link from "next/link";
import { PageHead } from "../components/PageHead";
import styles from "../styles/favorites.module.css";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { api } from "../utils/api";
import { CveLink } from "../components/CveLink";
import { Published } from "../types/v5-cve";

function Page({}) {
  const { favoriteIds } = useFavoriteStorage("favorites");
  const cves = api.getCVEs.useQuery({ ids: favoriteIds ?? [] });

  return (
    <>
      <PageHead title="cve.248.no - Favorite CVEs" />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <Link href="/">← Back</Link>
          </div>
          <h1>Favorite CVEs</h1>
          {cves.isLoading && <p>Loading...</p>}
          {cves.data
            ?.reverse()
            .map(
              (cve) =>
                cve.cveMetadata.state === "PUBLISHED" && (
                  <CveLink key={cve.cveMetadata.cveId} cve={cve as Published} />
                )
            )}
        </div>
      </main>
    </>
  );
}

export default Page;
