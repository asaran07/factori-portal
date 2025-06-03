"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ItemList from "@/components/ItemList";
import * as api from "@/services/api";
import styles from "./page.module.css";

export default function ViewItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        const data = await api.getItems();
        setItems(data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/manage-items" className={styles.backLink}>
              &larr; Back to Manage Items
            </Link>
          </div>
          <h1 className={styles.pageTitle}>All Items</h1>
        </div>
        <div className={styles.centerSection}>
          <div className={styles.itemsListWrapper}>
            <ItemList items={items} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}
