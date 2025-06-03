import React, { useState, useEffect } from "react";
import styles from "./EditItemModal.module.css";
import SimpleMenuButton from "./SimpleMenuButton/SimpleMenuButton";

export default function EditItemModal({ item, isOpen, onClose, onSave }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) {
      setItemName(item.item_name || "");
      setDescription(item.description || "");
      setError(null);
    }
  }, [item]);

  if (!isOpen || !item) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!itemName.trim()) {
      setError("Item name is required.");
      setIsLoading(false);
      return;
    }

    try {
      await onSave({
        item_name: itemName,
        description: description,
      });
    } catch (err) {
      setError(err.message || "Failed to update item. Please try again.");
      console.error("Failed to update item:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <h2>Edit Item (ID: {item.item_id})</h2>
        <form onSubmit={handleSubmit} className={styles.editItemForm}>
          <div className={styles.formField}>
            <label htmlFor="editItemName" className={styles.label}>
              Item Name:
            </label>
            <input
              type="text"
              id="editItemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="editDescription" className={styles.label}>
              Description (Optional):
            </label>
            <textarea
              id="editDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className={styles.textarea}
            />
          </div>

          {error && <p className={styles.errorMessage}>Error: {error}</p>}

          <div className={styles.formActions}>
            <SimpleMenuButton type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </SimpleMenuButton>
            <SimpleMenuButton
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={styles.cancelButton}
            >
              Cancel
            </SimpleMenuButton>
          </div>
        </form>
      </div>
    </div>
  );
}
