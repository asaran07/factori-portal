import React, { useState, useEffect, useCallback } from "react";
import styles from "./EditItemAttributesModal.module.css";
import SimpleMenuButton from "./SimpleMenuButton/SimpleMenuButton";
import * as api from "../services/api";

export default function EditItemAttributesModal({ item, isOpen, onClose }) {
  const [attributes, setAttributes] = useState([]);
  const [availableDefs, setAvailableDefs] = useState([]);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newDefId, setNewDefId] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newUnitId, setNewUnitId] = useState("");

  const loadData = useCallback(async () => {
    if (!item) return;
    try {
      setIsLoading(true);
      setError(null);
      const [itemDetails, allDefs, allUnits] = await Promise.all([
        api.getItemById(item.item_id),
        api.getAttributes(),
        api.getUnitDefinitions(),
      ]);

      setAttributes(itemDetails.attributes || []);
      setAvailableDefs(allDefs || []);
      setAvailableUnits(allUnits || []);
    } catch (err) {
      setError(err.message || "Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  }, [item]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, loadData]);

  if (!isOpen) return null;

  const handleAddAttribute = async (event) => {
    event.preventDefault();
    if (!newDefId) {
      setError("Please select an attribute to add.");
      return;
    }
    setError(null);
    try {
      await api.createItemAttribute({
        item_id: item.item_id,
        definition_id: parseInt(newDefId, 10),
        attribute_value: newValue.trim() === "" ? null : newValue,
        unit_id: newUnitId ? parseInt(newUnitId, 10) : null,
      });
      setNewDefId("");
      setNewValue("");
      setNewUnitId("");
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to add attribute.");
    }
  };

  const handleDeleteAttribute = async (attributeId) => {
    if (!window.confirm("Are you sure you want to remove this attribute?")) {
      return;
    }
    setError(null);
    try {
      await api.deleteItemAttribute(attributeId);
      await loadData();
    } catch (err) {
      setError(err.message || "Failed to delete attribute.");
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
        <h2>Manage Attributes for: {item.item_name}</h2>
        <div className={styles.modalBody}>
          <h4>Existing Attributes</h4>
          {isLoading && <p>Loading attributes...</p>}
          {!isLoading && attributes.length === 0 && (
            <p>This item has no attributes.</p>
          )}
          <ul className={styles.list}>
            {attributes.map((attr) => (
              <li key={attr.attribute_id} className={styles.listItem}>
                <span className={styles.attributeInfo}>
                  <strong>{attr.definition.attribute_name}:</strong>{" "}
                  {attr.attribute_value}
                  {attr.unit ? ` ${attr.unit.unit_name}` : ""}
                </span>
                <button
                  onClick={() => handleDeleteAttribute(attr.attribute_id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddAttribute} className={styles.addForm}>
            <h3>Add New Attribute</h3>
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label htmlFor="attribute-def" className={styles.label}>
                  Attribute
                </label>
                <select
                  id="attribute-def"
                  value={newDefId}
                  onChange={(e) => setNewDefId(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {availableDefs.map((def) => (
                    <option key={def.definition_id} value={def.definition_id}>
                      {def.attribute_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formField}>
                <label htmlFor="attribute-value" className={styles.label}>
                  Value
                </label>
                <input
                  id="attribute-value"
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className={styles.input}
                  placeholder="e.g., 12.5"
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="attribute-unit" className={styles.label}>
                  Unit (Optional)
                </label>
                <select
                  id="attribute-unit"
                  value={newUnitId}
                  onChange={(e) => setNewUnitId(e.target.value)}
                  className={styles.select}
                >
                  <option value="">None</option>
                  {availableUnits.map((unit) => (
                    <option key={unit.unit_id} value={unit.unit_id}>
                      {unit.unit_name}
                    </option>
                  ))}
                </select>
              </div>
              <SimpleMenuButton type="submit" className={styles.addButton}>
                Add
              </SimpleMenuButton>
            </div>
          </form>
        </div>
        {error && <p className={styles.errorMessage}>Error: {error}</p>}
        <div className={styles.modalActions}>
          <SimpleMenuButton type="button" onClick={onClose}>
            Done
          </SimpleMenuButton>
        </div>
      </div>
    </div>
  );
}
