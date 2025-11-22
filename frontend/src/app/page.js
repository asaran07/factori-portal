"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import NavCard from "@/components/NavCard/NavCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="appContainer">
      <div className={styles.dashboardContainer}>
        <h1 className={styles.dashboardTitle}>Factori-Portal</h1>
        <DashboardLayout>
          <NavCard title="Manage Items" href="/manage-items" />
          <NavCard title="Manage Attributes" href="/manage-attributes" />
          <NavCard title="Manage Storage" href="/manage-storage" />
        </DashboardLayout>
      </div>
    </div>
  );
}
