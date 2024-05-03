import styles from "./chip.module.css";

export function Chip({
  children,
  color = "blue",
}: {
  children: JSX.Element | string;
  color?: ChipColor;
}) {
  return (
    <span className={`${styles.chip} ${getColorStyle(color)}`}>{children}</span>
  );
}

type ChipColor = "red" | "blue";
function getColorStyle(color: ChipColor) {
  switch (color) {
    case "red":
      return styles.red;
    case "blue":
      return styles.blue;
    default:
      return styles.blue;
  }
}
