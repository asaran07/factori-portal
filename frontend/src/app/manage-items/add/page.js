"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as api from "@/services/api";
import styles from "./page.module.css";
import SimpleMenuButton from "@/components/SimpleMenuButton/SimpleMenuButton";

export default function AddItemPage() {
  const router = useRouter();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    if (!itemName.trim()) {
      setError("Item name is required.");
      setIsLoading(false);
      return;
    }

    try {
      const newItemData = {
        item_name: itemName,
        description: description,
      };
      const createdItem = await api.createItem(newItemData);
      setSuccessMessage(
        `Item "${createdItem.item_name}" created successfully! Redirecting...`,
      );
      setItemName(""); // Clear form
      setDescription("");
      setTimeout(() => {
        router.push("/manage-items/view");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create item. Please try again.");
      console.error("Failed to create item:", err); // maybe add a redirect here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/manage-items" className={styles.backLink}>
              &larr; Back to Manage Items
            </Link>
          </div>
          <h1 className={styles.pageTitle}>Add New Item</h1>
        </div>

        <div className={styles.centerSection}>
          <form onSubmit={handleSubmit} className={styles.addItemForm}>
            <div className={styles.formField}>
              <label htmlFor="itemName" className={styles.label}>
                Item Name:
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="description" className={styles.label}>
                Description (Optional):
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className={styles.textarea}
              />
            </div>

            {error && <p className={styles.errorMessage}>Error: {error}</p>}
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}

            <div className={styles.formActions}>
              <SimpleMenuButton type="submit" disabled={isLoading}>
                {isLoading ? "Adding Item..." : "Add Item"}
              </SimpleMenuButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
