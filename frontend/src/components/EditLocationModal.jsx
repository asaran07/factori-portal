import React, { useState, useEffect } from "react";
import styles from "./EditLocationModal.module.css";
import SimpleMenuButton from "./SimpleMenuButton/SimpleMenuButton";

export default function EditLocationModal({
  location,
  isOpen,
  onClose,
  onSave,
}) {
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      setLocationName(location.location_name || "");
      setDescription(location.location_description || "");
      setError(null);
    }
  }, [location]);

  if (!isOpen || !location) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!locationName.trim()) {
      setError("Location name is required.");
      setIsLoading(false);
      return;
    }

    try {
      await onSave({
        location_name: locationName,
        location_description: description,
      });
    } catch (err) {
      setError(err.message || "Failed to update location. Please try again.");
      console.error("Failed to update location:", err);
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
        <h2>Edit Location (ID: {location.location_id})</h2>
        <form onSubmit={handleSubmit} className={styles.editItemForm}>
          <div className={styles.formField}>
            <label htmlFor="editLocationName" className={styles.label}>
              Location Name:
            </label>
            <input
              type="text"
              id="editLocationName"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              required
              className={styles.input}
              disabled={isLoading}
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
              disabled={isLoading}
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
