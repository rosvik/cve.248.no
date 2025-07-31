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

type ChipColor =
  | "gray"
  | "dark-gray"
  | "light-gray"
  | "text-dark"
  | "text"
  | "purple"
  | "blue"
  | "red"
  | "yellow"
  | "pink"
  | "green"
  | "dark-green";
function getColorStyle(color: ChipColor) {
  switch (color) {
    case "gray":
      return styles.gray;
    case "dark-gray":
      return styles.darkGray;
    case "light-gray":
      return styles.lightGray;
    case "text-dark":
      return styles.textDark;
    case "text":
      return styles.text;
    case "purple":
      return styles.purple;
    case "blue":
      return styles.blue;
    case "red":
      return styles.red;
    case "yellow":
      return styles.yellow;
    case "pink":
      return styles.pink;
    case "green":
      return styles.green;
    case "dark-green":
      return styles.darkGreen;
    default:
      return styles.blue;
  }
}
