import Link from "next/link";
import styles from "../cve.module.css";
import CvePage from "./CvePage";

export default async function Page({ params }: { params: { cveId: string } }) {
  const id = params.cveId;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/">← Back</Link>
        <CvePage id={id}></CvePage>
      </div>
    </main>
  );
}
