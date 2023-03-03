"use client"; // Error components must be Client components

import Link from "next/link";
import { useEffect } from "react";
import styles from "./index.module.css";

export default function Error({
  error,
}: // reset,
{
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className={styles.container}>
        <h1>Something went wrong!</h1>
        <p>
          <pre>{error.message}</pre>
        </p>
        <div>
          <Link href="/">← Back</Link>
        </div>
      </div>
    </div>
  );
}
