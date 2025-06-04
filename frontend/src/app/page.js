"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import NavCard from "@/components/NavCard/NavCard";

export default function Home() {
  return (
    <div className="appContainer">
      {" "}
      {}
      <DashboardLayout>
        <NavCard title="Manage Items" href="/manage-items" />
        <NavCard title="Manage Attributes" href="/manage-attributes" />
      </DashboardLayout>
    </div>
  );
}
