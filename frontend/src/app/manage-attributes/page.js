"use client";

import React from "react";
import Link from "next/link";
import SimpleMenuButton from "@/components/SimpleMenuButton/SimpleMenuButton";
import styles from "../manage-items/page.module.css"; //

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
            <h1>Manage Attributes</h1>
            <p>
              Define and organize attributes that can be assigned to items.
              <br />
              Attributes help detail, categorize, and track specific
              characteristics of your items.
            </p>
          </div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.menuButtonSection}>
            <SimpleMenuButton href="/manage-attributes/view">
              View Attributes
            </SimpleMenuButton>
            <SimpleMenuButton href="/manage-attributes/add">
              Add New Attribute
            </SimpleMenuButton>
          </div>
        </div>
      </div>
    </div>
  );
}
