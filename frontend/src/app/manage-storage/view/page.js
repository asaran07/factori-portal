"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import LocationList from "@/components/LocationList";
import EditLocationModal from "@/components/EditLocationModal";
import * as api from "@/services/api";
import styles from "./page.module.css";

export default function ViewLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadLocations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getLocations();
      setLocations(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch locations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  const handleDeleteLocation = async (locationId) => {
    // Initial confirmation
    if (!window.confirm("Are you sure you want to delete this location?")) {
      return;
    }

    try {
      setLoading(true);
      await api.deleteLocation(locationId, false); // first attempt without forcing
      await loadLocations(); // reload if successful
    } catch (err) {
      // check if the error is the specific '409 Conflict'
      if (err.message && err.message.includes("currently assigned")) {
        // ask for the second, more specific confirmation
        if (
          window.confirm(
            "This location is in use. Deleting it will orphan some records. Are you sure you want to proceed?",
          )
        ) {
          try {
            // second attempt, this time forcing the deletion
            await api.deleteLocation(locationId, true);
            await loadLocations(); // reload after forced deletion
          } catch (forceErr) {
            setError(forceErr);
            console.error("Failed to force delete location:", forceErr);
          }
        }
      } else {
        setError(err);
        console.error("Failed to delete location:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (location) => {
    setEditingLocation(location);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingLocation(null);
  };

  const handleUpdateLocation = async (updatedLocationData) => {
    if (!editingLocation) return;
    try {
      await api.updateLocation(
        editingLocation.location_id,
        updatedLocationData,
      );
      handleCloseEditModal();
      await loadLocations(); // reload the list to show changes
    } catch (err) {
      console.error("Failed to update location:", err);
      // we pass the error up to the modal to display it there
      throw err;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/manage-storage" className={styles.backLink}>
              &larr; Manage Storage
            </Link>
            <Link href="/" className={styles.backLink}>
              &larr; Dashboard
            </Link>
          </div>
          <h1 className={styles.pageTitle}>View All Locations</h1>
        </div>
        <div className={styles.centerSection}>
          <div className={styles.itemsListWrapper}>
            <LocationList
              locations={locations}
              loading={loading}
              error={error}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteLocation}
            />
          </div>
        </div>

        {isEditModalOpen && editingLocation && (
          <EditLocationModal
            location={editingLocation}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleUpdateLocation}
          />
        )}
      </div>
    </div>
  );
}
