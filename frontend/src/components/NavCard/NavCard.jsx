import Link from "next/link";
import styles from "./NavCard.module.css";

export default function NavCard({ title, href }) {
  return (
    <Link href={href} className={styles.navCard}>
      <h3>{title}</h3>
      {}
    </Link>
  );
}
