import React, { useState } from "react";
import * as api from "@/services/api";
import styles from "./ItemList.module.css";

const ExpandedItemView = ({ item, onEdit, onDelete, onEditAttributes }) => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const data = await api.getInventoryByItemId(item.item_id);
        setInventory(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInventory();
  }, [item.item_id]);

  return (
    <div className={styles.expandedView}>
      <div className={styles.expandedDetails}>
        <h4>Storage Locations:</h4>
        {isLoading && <p>Loading locations...</p>}
        {error && <p className={styles.error}>Could not load locations.</p>}
        {!isLoading && !error && inventory.length > 0 ? (
          <ul>
            {inventory.map((inv) => (
              <li key={inv.inventory_id}>
                {inv.location?.location_name || "Unknown Location"}:{" "}
                <strong>{inv.quantity}</strong> units
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && <p>Not stored in any location.</p>
        )}
      </div>
      <div className={styles.expandedMeta}>
        <h4>Details:</h4>
        <div className={styles.itemDates}>
          Created: {new Date(item.created_at).toLocaleString()}
          <br />
          Updated: {new Date(item.updated_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default function ItemList({
  items,
  loading,
  error,
  onEdit,
  onDelete,
  onEditAttributes,
}) {
  const [expandedItemId, setExpandedItemId] = useState(null);

  if (loading) {
    return <p className={styles.message}>Loading items...</p>;
  }

  if (error) {
    return (
      <p className={`${styles.message} ${styles.error}`}>
        Error fetching items: {error.message || "Unknown error"}
      </p>
    );
  }

  if (!items || items.length === 0) {
    return <p className={styles.message}>No items found.</p>;
  }

  const toggleExpand = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  return (
    <div className={styles.itemListContainer}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.item_id} className={styles.listItemWrapper}>
            <div
              className={styles.listItem}
              onClick={() => toggleExpand(item.item_id)}
            >
              <div className={styles.itemDetails}>
                <div className={styles.itemName}>
                  {item.item_name} (ID: {item.item_id})
                </div>
                <div className={styles.itemDescription}>
                  {item.description || "No description"}
                </div>
                <div className={styles.attributesContainer}>
                  {item.attributes && item.attributes.length > 0 ? (
                    item.attributes.map((attr) => (
                      <span
                        key={attr.attribute_id}
                        className={styles.attributeTag}
                      >
                        {attr.definition.attribute_name}: {attr.attribute_value}
                        {attr.unit ? ` ${attr.unit.unit_name}` : ""}
                      </span>
                    ))
                  ) : (
                    <span className={styles.noAttributes}>No attributes</span>
                  )}
                </div>
              </div>
              <div className={styles.itemActions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditAttributes(item);
                  }}
                  className={`${styles.actionButton} ${styles.attributesButton}`}
                >
                  Attributes
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item);
                  }}
                  className={`${styles.actionButton} ${styles.editButton}`}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.item_id);
                  }}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  Delete
                </button>
              </div>
            </div>
            {expandedItemId === item.item_id && (
              <ExpandedItemView item={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
