import Link from "next/link";
import { PageHead } from "../components/PageHead";
import styles from "../styles/favorites.module.css";
import { useFavoriteStorage } from "../utils/use-favorite-storage";
import { api } from "../utils/api";
import { unsafeIsPublished } from "../utils/validator";
import { CveLink } from "../components/CveLink";

function Page({}) {
  const { favoriteIds } = useFavoriteStorage("favorites");
  const cves = api.prismaRouter.getMany.useQuery({ ids: favoriteIds ?? [] });

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
            ?.toReversed()
            .map(
              (cve) =>
                unsafeIsPublished(cve.json) && (
                  <CveLink key={cve.id} cve={cve.json} />
                )
            )}
        </div>
      </main>
    </>
  );
}

export default Page;
