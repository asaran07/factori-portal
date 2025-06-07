"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as api from "@/services/api";
import styles from "./page.module.css";
import SimpleMenuButton from "@/components/SimpleMenuButton/SimpleMenuButton";

export default function MoveInventoryPage() {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedItemId, setSelectedItemId] = useState("");
  const [sourceLocationId, setSourceLocationId] = useState("");
  const [destinationLocationId, setDestinationLocationId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, locationsData] = await Promise.all([
          api.getItems(),
          api.getLocations(),
        ]);
        setItems(itemsData || []);
        setLocations(locationsData || []);
      } catch (err) {
        setError("Failed to load items and locations for the form.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    if (sourceLocationId === destinationLocationId) {
      setError("Source and Destination locations cannot be the same.");
      setIsLoading(false);
      return;
    }

    try {
      const moveData = {
        item_id: parseInt(selectedItemId, 10),
        source_location_id: parseInt(sourceLocationId, 10),
        destination_location_id: parseInt(destinationLocationId, 10),
        quantity: parseFloat(quantity),
      };

      const result = await api.moveInventory(moveData);
      setSuccessMessage(result.message);

      setSelectedItemId("");
      setSourceLocationId("");
      setDestinationLocationId("");
      setQuantity("");
    } catch (err) {
      setError(`${err.message} The transaction was rolled back.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageLayout}>
        <div className={styles.topSection}>
          <div className={styles.topBar}>
            <Link href="/" className={styles.backLink}>
              &larr; Back to Dashboard
            </Link>
          </div>
          <h1 className={styles.pageTitle}>Move Inventory (Transaction)</h1>
        </div>

        <div className={styles.centerSection}>
          <form onSubmit={handleSubmit} className={styles.addItemForm}>
            <div className={styles.formField}>
              <label htmlFor="item" className={styles.label}>
                Item to Move:
              </label>
              <select
                id="item"
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                required
                className={styles.select}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select an item...
                </option>
                {items.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.item_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label htmlFor="source" className={styles.label}>
                From Location:
              </label>
              <select
                id="source"
                value={sourceLocationId}
                onChange={(e) => setSourceLocationId(e.target.value)}
                required
                className={styles.select}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select a source...
                </option>
                {locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.location_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label htmlFor="destination" className={styles.label}>
                To Location:
              </label>
              <select
                id="destination"
                value={destinationLocationId}
                onChange={(e) => setDestinationLocationId(e.target.value)}
                required
                className={styles.select}
                disabled={isLoading}
              >
                <option value="" disabled>
                  Select a destination...
                </option>
                {locations.map((loc) => (
                  <option key={loc.location_id} value={loc.location_id}>
                    {loc.location_name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label htmlFor="quantity" className={styles.label}>
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className={styles.input}
                min="0.01"
                step="any"
                disabled={isLoading}
              />
            </div>

            {error && <p className={styles.errorMessage}>Error: {error}</p>}
            {successMessage && (
              <p className={styles.successMessage}>{successMessage}</p>
            )}

            <div className={styles.formActions}>
              <SimpleMenuButton type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Execute Move"}
              </SimpleMenuButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
