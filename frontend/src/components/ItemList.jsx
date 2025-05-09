import React from "react";
import styles from "./ItemList.module.css";

export default function ItemList({ items, loading, error }) {
  if (loading) {
    return <p className={styles.message}>Loading items...</p>;
  }

  if (error) {
    return (
      <p className={`${styles.message} ${styles.error}`}>
        Error fetching items: {error.message || "Unknown error"}
      </p>
    );
  }

  if (!items || items.length === 0) {
    return <p className={styles.message}>No items found.</p>;
  }

  return (
    <div className={styles.itemListContainer}>
      <h2>Item List</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.item_id} className={styles.listItem}>
            <div className={styles.itemName}>
              {item.item_name} (ID: {item.item_id})
            </div>
            <div className={styles.itemDescription}>
              {item.description || "No description"}
            </div>
            <div className={styles.itemDates}>
              Created: {new Date(item.created_at).toLocaleDateString()} |
              Updated: {new Date(item.updated_at).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
