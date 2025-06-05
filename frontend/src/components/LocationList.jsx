import React from "react";
import styles from "./LocationList.module.css";

export default function LocationList({
  locations,
  loading,
  error,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className={styles.message}>Loading locations...</p>;
  }

  if (error) {
    return (
      <p className={`${styles.message} ${styles.error}`}>
        Error fetching locations: {error.message || "Unknown error"}
      </p>
    );
  }

  if (!locations || locations.length === 0) {
    return <p className={styles.message}>No locations found.</p>;
  }

  return (
    <div className={styles.itemListContainer}>
      <ul className={styles.list}>
        {locations.map((location) => (
          <li key={location.location_id} className={styles.listItem}>
            <div className={styles.itemDetails}>
              <div className={styles.itemName}>
                {location.location_name} (ID: {location.location_id})
              </div>
              <div className={styles.itemDescription}>
                {location.location_description || "No description provided"}
              </div>
            </div>
            <div className={styles.itemActions}>
              <button
                onClick={() => onEdit(location)}
                className={`${styles.actionButton} ${styles.editButton}`}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(location.location_id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
