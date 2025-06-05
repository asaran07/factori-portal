"use client";

import React from "react";
import Link from "next/link";
import SimpleMenuButton from "@/components/SimpleMenuButton/SimpleMenuButton";
import styles from "../manage-items/page.module.css";

export default function ManageStoragePage() {
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
            <h1>Manage Storage</h1>
            <p>
              Create and manage locations where items can be stored, moved, or
              transferred.
            </p>
          </div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.menuButtonSection}>
            <SimpleMenuButton href="/manage-storage/view">
              View All Locations
            </SimpleMenuButton>
            <SimpleMenuButton href="/manage-storage/add">
              Add New Location
            </SimpleMenuButton>
          </div>
        </div>
      </div>
    </div>
  );
}
