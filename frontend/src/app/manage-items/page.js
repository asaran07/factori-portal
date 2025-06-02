"use client";

import React from "react";
import pageSpecificStyles from "./page.module.css";

export default function ManageItemsPage() {
  return (
    <div className={`appContainer ${pageSpecificStyles.pageLayout}`}>
      <h1>Manage Items Page</h1>
      <p>This page will be used for managing items.</p>
    </div>
  );
}
