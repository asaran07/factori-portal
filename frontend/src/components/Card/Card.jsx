import styles from "./Card.module.css";

export default function Card({ children }) {
  return <div className={styles.blankCardBackground}>{children}</div>;
}
