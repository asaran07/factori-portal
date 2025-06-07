"use client";

import React from "react";
import Link from "next/link";
import SimpleMenuButton from "@/components/SimpleMenuButton/SimpleMenuButton";
import styles from "./page.module.css";

export default function ManageItemsPage() {
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
            <h1>Manage Items</h1>
            <p>Select an option below to manage your items.</p>
          </div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.menuButtonSection}>
            <SimpleMenuButton href="/manage-items/view">
              View Items
            </SimpleMenuButton>
            <SimpleMenuButton href="/manage-items/add">
              Add New Item
            </SimpleMenuButton>
            <SimpleMenuButton href="/move-inventory">
              Move Inventory
            </SimpleMenuButton>
          </div>
        </div>
      </div>
    </div>
  );
}
