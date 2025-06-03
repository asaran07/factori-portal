import Link from "next/link";
import styles from "./SimpleMenuButton.module.css";

export default function SimpleMenuButton({
  children,
  href,
  onClick,
  type = "button",
}) {
  if (href) {
    return (
      <Link href={href} className={styles.simpleButton}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={styles.simpleButton}>
      {children}
    </button>
  );
}
