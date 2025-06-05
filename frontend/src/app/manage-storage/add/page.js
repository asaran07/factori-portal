"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as api from "@/services/api";
import styles from "./page.module.css";
import SimpleMenuButton from "@/components/SimpleMenuButton/SimpleMenuButton";

export default function AddLocationPage() {
  const router = useRouter();
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    if (!locationName.trim()) {
      setError("Location name is required.");
      setIsLoading(false);
      return;
    }

    try {
      const newLocationData = {
        location_name: locationName.trim(),
        location_description: description.trim() || null,
      };
      const createdLocation = await api.createLocation(newLocationData);
      setSuccessMessage(
        `Location "${createdLocation.location_name}" created successfully! Redirecting...`,
      );

      setLocationName("");
      setDescription("");

      // redirect to the view page after 2 seconds
      setTimeout(() => {
        router.push("/manage-storage/view");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create location. Please try again.");
      console.error("Failed to create location:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/manage-storage" className={styles.backLink}>
              &larr; Back to Manage Storage
            </Link>
          </div>
          <h1 className={styles.pageTitle}>Add New Location</h1>
        </div>

        <div className={styles.centerSection}>
          <form onSubmit={handleSubmit} className={styles.addItemForm}>
            <div className={styles.formField}>
              <label htmlFor="locationName" className={styles.label}>
                Location Name:
              </label>
              <input
                type="text"
                id="locationName"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                required
                className={styles.input}
                placeholder="e.g., Shelf A-03"
                disabled={isLoading}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="description" className={styles.label}>
                Description (Optional):
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className={styles.textarea}
                placeholder="e.g., Top shelf for small components"
                disabled={isLoading}
              />
            </div>

            {error && <p className={styles.errorMessage}>Error: {error}</p>}
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}

            <div className={styles.formActions}>
              <SimpleMenuButton type="submit" disabled={isLoading}>
                {isLoading ? "Adding Location..." : "Add Location"}
              </SimpleMenuButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
