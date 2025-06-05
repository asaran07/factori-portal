"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as api from "../../../services/api";
import styles from "./page.module.css";
import SimpleMenuButton from "../../../components/SimpleMenuButton/SimpleMenuButton";

export default function AddAttributePage() {
  const router = useRouter();
  const [attributeName, setAttributeName] = useState("");
  const [selectedUnitTypeId, setSelectedUnitTypeId] = useState("");
  const [dataType, setDataType] = useState("");
  const [allowedValues, setAllowedValues] = useState("");
  const [unitTypes, setUnitTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUnitTypes = async () => {
      try {
        const types = await api.getUnitTypes();
        setUnitTypes(types || []);
      } catch (err) {
        console.error("Failed to fetch unit types:", err);
        setError("Failed to load unit types. Please try refreshing the page.");
      }
    };
    fetchUnitTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

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
      const newAttributeData = {
        attribute_name: attributeName.trim(),
        unit_type_id: parseInt(selectedUnitTypeId, 10),
        data_type: dataType.trim() === "" ? null : dataType.trim(),
        allowed_values:
          allowedValues.trim() === "" ? null : allowedValues.trim(),
      };
      const createdAttribute = await api.createAttribute(newAttributeData);
      setSuccessMessage(
        `Attribute "${createdAttribute.attribute_name}" created successfully! Redirecting...`,
      );
      setAttributeName("");
      setSelectedUnitTypeId("");
      setDataType("");
      setAllowedValues("");
      setTimeout(() => {
        router.push("/manage-attributes/view");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create attribute. Please try again.");
      console.error("Failed to create attribute:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/manage-attributes" className={styles.backLink}>
              &larr; Back to Manage Attributes
            </Link>
          </div>
          <h1 className={styles.pageTitle}>Add New Attribute Definition</h1>
        </div>

        <div className={styles.centerSection}>
          <form onSubmit={handleSubmit} className={styles.addForm}>
            <div className={styles.formField}>
              <label htmlFor="attributeName" className={styles.label}>
                Attribute Name:
              </label>
              <input
                type="text"
                id="attributeName"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
                required
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="unitType" className={styles.label}>
                Unit Type:
              </label>
              <select
                id="unitType"
                value={selectedUnitTypeId}
                onChange={(e) => setSelectedUnitTypeId(e.target.value)}
                required
                className={styles.select}
                disabled={isLoading || unitTypes.length === 0}
              >
                <option value="" disabled>
                  Select a Unit Type...
                </option>
                {unitTypes.map((ut) => (
                  <option key={ut.type_id} value={ut.type_id}>
                    {ut.type_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label htmlFor="dataType" className={styles.label}>
                Data Type (Optional):
              </label>
              <input
                type="text"
                id="dataType"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="allowedValues" className={styles.label}>
                Allowed Values (Optional):
              </label>
              <textarea
                id="allowedValues"
                value={allowedValues}
                onChange={(e) => setAllowedValues(e.target.value)}
                rows="3"
                className={styles.textarea}
                disabled={isLoading}
              />
            </div>

            {error && <p className={styles.errorMessage}>Error: {error}</p>}
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}

            <div className={styles.formActions}>
              <SimpleMenuButton type="submit" disabled={isLoading}>
                {isLoading ? "Adding Attribute..." : "Add Attribute"}
              </SimpleMenuButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
