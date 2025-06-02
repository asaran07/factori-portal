"use client";

import React from "react";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import NavCard from "@/components/NavCard/NavCard";

export default function Home() {
  return (
    <div className="appContainer">
      {" "}
      {/* Ensures background and centering from globals.css */}
      <DashboardLayout>
        <NavCard title="Manage Items" href="/manage-items" />
        {/* You can add more NavCard components here later as you build them out:
            <NavCard title="View Inventory" href="/inventory" />
            <NavCard title="User Settings" href="/settings" />
        */}
      </DashboardLayout>
    </div>
  );
}
