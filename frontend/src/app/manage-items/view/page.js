"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ItemList from "@/components/ItemList";
import EditItemModal from "@/components/EditItemModal";
import EditItemAttributesModal from "@/components/EditItemAttributesModal";
import * as api from "@/services/api";
import styles from "./page.module.css";

export default function ViewItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // state for the original edit modal
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // state for the new attributes modal
  const [itemForAttributes, setItemForAttributes] = useState(null);
  const [isAttributesModalOpen, setIsAttributesModalOpen] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        setLoading(true);
        await api.deleteItem(itemId);
        await loadItems();
      } catch (err) {
        console.error("Failed to delete item:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handlers for the original Edit Item modal
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    loadItems();
  };

  const handleUpdateItem = async (updatedItemData) => {
    if (!editingItem) return;
    try {
      await api.updateItem(editingItem.item_id, updatedItemData);
      handleCloseEditModal(); // this will close and reload
    } catch (err) {
      console.error("Failed to update item:", err);
      setError(new Error("Failed to update item. " + (err.message || "")));
      throw err;
    }
  };

  const handleOpenAttributesModal = (item) => {
    setItemForAttributes(item);
    setIsAttributesModalOpen(true);
  };

  const handleCloseAttributesModal = () => {
    setIsAttributesModalOpen(false);
    setItemForAttributes(null);
    loadItems();
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/manage-items" className={styles.backLink}>
              &larr; Manage Items
            </Link>
            <Link href="/" className={styles.backLink}>
              &larr; Dashboard
            </Link>
          </div>
          <h1 className={styles.pageTitle}>All Items</h1>
        </div>
        <div className={styles.centerSection}>
          <div className={styles.itemsListWrapper}>
            <ItemList
              items={items}
              loading={loading}
              error={error}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteItem}
              onEditAttributes={handleOpenAttributesModal}
            />
          </div>
        </div>

        {isEditModalOpen && editingItem && (
          <EditItemModal
            item={editingItem}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleUpdateItem}
          />
        )}

        {isAttributesModalOpen && itemForAttributes && (
          <EditItemAttributesModal
            item={itemForAttributes}
            isOpen={isAttributesModalOpen}
            onClose={handleCloseAttributesModal}
          />
        )}
      </div>
    </div>
  );
}
