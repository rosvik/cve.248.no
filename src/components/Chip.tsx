import styles from "./chip.module.css";

export function Chip({ children }: { children: JSX.Element | string }) {
  return <span className={styles.chip}>{children}</span>;
}
