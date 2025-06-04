"use client";

import React from "react";
import Link from "next/link";
import styles from "../manage-items/page.module.css";

export default function ManageAttributesPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/" className={styles.backLink}>
              &larr; Back to Dashboard
            </Link>
          </div>
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>Manage Attributes</h1>
            <p className={styles.placeholderText}>WIP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
