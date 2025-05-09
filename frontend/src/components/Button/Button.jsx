import styles from "./Button.module.css";

export default function Button({ children, onClick, ...props }) {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
