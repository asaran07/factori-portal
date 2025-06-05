"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AttributeList from "@/components/AttributeList";
import EditAttributeModal from "@/components/EditAttributeModal";
import * as api from "@/services/api";
import styles from "./page.module.css";

export default function ViewAttributesPage() {
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadAttributes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAttributes();
      setAttributes(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch attributes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAttributes();
  }, [loadAttributes]);

  const handleDeleteAttribute = async (attributeId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this attribute definition?",
      )
    ) {
      try {
        setLoading(true);
        await api.deleteAttribute(attributeId);
        await loadAttributes();
      } catch (err) {
        console.error("Failed to delete attribute:", err);
        setError(new Error(err.message || "Failed to delete attribute."));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOpenEditModal = (attribute) => {
    setEditingAttribute(attribute);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingAttribute(null);
  };

  const handleUpdateAttribute = async (updatedAttributeDataFromModal) => {
    if (!editingAttribute) return;
    try {
      await api.updateAttribute(
        editingAttribute.definition_id,
        updatedAttributeDataFromModal,
      );
      handleCloseEditModal();
      await loadAttributes();
    } catch (err) {
      console.error("Failed to update attribute:", err);
      throw err;
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
          <h1 className={styles.pageTitle}>All Attribute Definitions</h1>
        </div>
        <div className={styles.centerSection}>
          <div className={styles.itemsListWrapper}>
            <AttributeList
              attributes={attributes}
              loading={loading}
              error={error}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteAttribute}
            />
          </div>
        </div>

        {isEditModalOpen && editingAttribute && (
          <EditAttributeModal
            attributeToEdit={editingAttribute}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleUpdateAttribute}
          />
        )}
      </div>
    </div>
  );
}
