import React, { useState, useEffect } from "react";
import styles from "./EditAttributeModal.module.css";
import SimpleMenuButton from "./SimpleMenuButton/SimpleMenuButton"; //
import * as api from "../services/api";

export default function EditAttributeModal({
  attributeToEdit,
  isOpen,
  onClose,
  onSave,
}) {
  const [attributeName, setAttributeName] = useState("");
  const [selectedUnitTypeId, setSelectedUnitTypeId] = useState("");
  const [dataType, setDataType] = useState("");
  const [allowedValues, setAllowedValues] = useState("");

  const [unitTypes, setUnitTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const fetchUnitTypes = async () => {
        try {
          const types = await api.getUnitTypes();
          setUnitTypes(types || []);
        } catch (err) {
          console.error("Failed to fetch unit types:", err);
          setError(
            "Failed to load unit types. Please try closing and reopening the modal.",
          );
        }
      };
      fetchUnitTypes();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && attributeToEdit) {
      setAttributeName(attributeToEdit.attribute_name || "");
      // unit_type in attributeToEdit is the ID
      setSelectedUnitTypeId(attributeToEdit.unit_type?.toString() || "");
      setDataType(attributeToEdit.data_type || "");
      setAllowedValues(attributeToEdit.allowed_values || "");
      setError(null);
    }
    if (!isOpen) {
      setAttributeName("");
      setSelectedUnitTypeId("");
      setDataType("");
      setAllowedValues("");
      setError(null);
      // unitTypes can be kept as they don't change often
    }
  }, [attributeToEdit, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!attributeName.trim()) {
      setError("Attribute name is required.");
      setIsLoading(false);
      return;
    }
    if (!selectedUnitTypeId) {
      setError("Unit type is required.");
      setIsLoading(false);
      return;
    }

    try {
      await onSave({
        attribute_name: attributeName,
        unit_type_id: parseInt(selectedUnitTypeId, 10),
        data_type: dataType.trim() === "" ? null : dataType,
        allowed_values: allowedValues.trim() === "" ? null : allowedValues,
      });
      // onClose(); // onSave in ViewAttributesPage will call onClose after successful save & reload
    } catch (err) {
      setError(err.message || "Failed to update attribute. Please try again.");
      console.error("Failed to update attribute:", err);
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
        <h2>Edit Attribute (ID: {attributeToEdit?.definition_id || "New"})</h2>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formField}>
            <label htmlFor="editAttributeName" className={styles.label}>
              Attribute Name:
            </label>
            <input
              type="text"
              id="editAttributeName"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
              required
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="editUnitType" className={styles.label}>
              Unit Type:
            </label>
            <select
              id="editUnitType"
              value={selectedUnitTypeId}
              onChange={(e) => setSelectedUnitTypeId(e.target.value)}
              required
              className={styles.select}
              disabled={isLoading || unitTypes.length === 0}
            >
              <option value="" disabled>
                Select a Unit Type
              </option>
              {unitTypes.map((ut) => (
                <option key={ut.type_id} value={ut.type_id}>
                  {ut.type_name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formField}>
            <label htmlFor="editDataType" className={styles.label}>
              Data Type (Optional):
            </label>
            <input
              type="text"
              id="editDataType"
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="editAllowedValues" className={styles.label}>
              Allowed Values (Optional):
            </label>
            <textarea
              id="editAllowedValues"
              value={allowedValues}
              onChange={(e) => setAllowedValues(e.target.value)}
              rows="3"
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
