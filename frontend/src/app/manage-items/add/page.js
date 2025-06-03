"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function AddItemPage() {
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
          <p className={styles.placeholderText}>
            This page will be used for adding new items.
          </p>
        </div>
      </div>
    </div>
  );
}
