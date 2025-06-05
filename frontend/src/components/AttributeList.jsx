import React from "react";
import styles from "./AttributeList.module.css";

export default function AttributeList({
  attributes,
  loading,
  error,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <p className={styles.message}>Loading attributes...</p>;
  }

  if (error) {
    return (
      <p className={`${styles.message} ${styles.error}`}>
        Error fetching attributes: {error.message || "Unknown error"}
      </p>
    );
  }

  if (!attributes || attributes.length === 0) {
    return <p className={styles.message}>No attribute definitions found.</p>;
  }

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>
        {attributes.map((attr) => (
          <li key={attr.definition_id} className={styles.listItem}>
            <div className={styles.itemDetails}>
              <div className={styles.attributePrimaryInfo}>
                {attr.attribute_name} (ID: {attr.definition_id})
              </div>
              <div className={styles.attributeSecondaryInfo}>
                <strong>Unit Type:</strong>{" "}
                {attr.unit_type_details?.type_name || "N/A"}
              </div>
              <div className={styles.attributeSecondaryInfo}>
                <strong>Data Type:</strong> {attr.data_type || "N/A"}
              </div>
              <div className={styles.attributeSecondaryInfo}>
                <strong>Allowed Values:</strong> {attr.allowed_values || "N/A"}
              </div>
            </div>
            <div className={styles.itemActions}>
              <button
                onClick={() => onEdit(attr)}
                className={`${styles.actionButton} ${styles.editButton}`}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(attr.definition_id)}
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
