const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Helper function to make API requests.
 * @param {string} endpoint - The API endpoint to call (e.g., '/items/').
 * @param {object} options - Optional fetch options (method, headers, body).
 * @returns {Promise<any>} - A promise that resolves with the JSON response.
 * @throws {Error} - Throws error if the API call fails or returns a non-OK status.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorDetail = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetail =
          errorData.detail || JSON.stringify(errorData) || errorDetail;
      } catch (e) {
        errorDetail = response.statusText || errorDetail;
      }
      throw new Error(errorDetail);
    }
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("API request failed:", endpoint, error.message);
    throw error;
  }
}

/**
 * Fetches a list of all items.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of items.
 */
export const getItems = () => {
  return request("/items");
};

/**
 * Fetches a single item by its ID.
 * @param {number|string} itemId - The ID of the item to fetch.
 * @returns {Promise<object>} - A promise that resolves to the item object.
 */
export const getItemById = (itemId) => {
  return request(`/items/${itemId}`);
};

/**
 * Creates a new item.
 * @param {object} itemData - The data for the new item.
 * @param {string} itemData.item_name - The name of the item.
 * @param {string} [itemData.description] - The optional description of the item.
 * @returns {Promise<object>} - A promise that resolves to the created item object.
 */
export const createItem = (itemData) => {
  return request("/items", {
    method: "POST",
    body: JSON.stringify(itemData),
  });
};

/**
 * Updates an existing item by its ID.
 * @param {number|string} itemId - The ID of the item to update.
 * @param {object} itemData - The data to update the item with (only include fields to be updated).
 * @param {string} [itemData.item_name] - The new name of the item.
 * @param {string} [itemData.description] - The new description of the item.
 * @returns {Promise<object>} - A promise that resolves to the updated item object.
 */
export const updateItem = (itemId, itemData) => {
  return request(`/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(itemData),
  });
};

/**
 * Deletes an item by its ID.
 * @param {number|string} itemId - The ID of the item to delete.
 * @returns {Promise<null>} - A promise that resolves to null (or void) upon successful deletion.
 */
export const deleteItem = (itemId) => {
  return request(`/items/${itemId}`, {
    method: "DELETE",
  });
};

/**
 * Fetches a list of all locations.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of locations.
 */
export const getLocations = () => {
  return request("/locations");
};

/**
 * Fetches a single location by its ID.
 * @param {number|string} locationId - The ID of the location to fetch.
 * @returns {Promise<object>} - A promise that resolves to the location object.
 */
export const getLocationById = (locationId) => {
  return request(`/locations/${locationId}`);
};

/**
 * Creates a new location.
 * @param {object} locationData - The data for the new location.
 * @param {string} locationData.location_name - The name of the location.
 * @param {string} [locationData.location_description] - The optional description.
 * @returns {Promise<object>} - A promise that resolves to the created location object.
 */
export const createLocation = (locationData) => {
  return request("/locations", {
    method: "POST",
    body: JSON.stringify(locationData),
  });
};

/**
 * Updates an existing location by its ID.
 * @param {number|string} locationId - The ID of the location to update.
 * @param {object} locationData - The data to update (only include fields to be updated).
 * @returns {Promise<object>} - A promise that resolves to the updated location object.
 */
export const updateLocation = (locationId, locationData) => {
  return request(`/locations/${locationId}`, {
    method: "PATCH",
    body: JSON.stringify(locationData),
  });
};

/**
 * Deletes a location by its ID.
 * @param {number|string} locationId - The ID of the location to delete.
 * @param {boolean} [confirmOrphan=false] - Set to true to confirm deletion even if it orphans records.
 * @returns {Promise<null>} - A promise that resolves to null upon successful deletion.
 */
export const deleteLocation = (locationId, confirmOrphan = false) => {
  let endpoint = `/locations/${locationId}`;
  if (confirmOrphan) {
    // query parameter to the URL for the backend to see
    endpoint += "?confirmOrphan=true";
  }
  return request(endpoint, {
    method: "DELETE",
  });
};

/**
 * Fetches a list of all unit types.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of unit types.
 * Each unit type object should contain type_id and type_name.
 */
export const getUnitTypes = () => {
  return request("/unit-types");
};

/**
 * Fetches a list of all attribute definitions.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of attribute definitions.
 */
export const getAttributes = () => {
  return request("/attributes");
};

/**
 * Fetches a single attribute definition by its ID.
 * @param {number|string} attributeId - The ID of the attribute definition to fetch.
 * @returns {Promise<object>} - A promise that resolves to the attribute definition object.
 */
export const getAttributeById = (attributeId) => {
  return request(`/attributes/${attributeId}`);
};

/**
 * Creates a new attribute definition.
 * @param {object} attributeData - The data for the new attribute definition.
 * @param {string} attributeData.attribute_name - The name of the attribute.
 * @param {number} attributeData.unit_type_id - The ID of the associated unit type.
 * @param {string} [attributeData.data_type] - The optional data type.
 * @param {string} [attributeData.allowed_values] - The optional allowed values.
 * @returns {Promise<object>} - A promise that resolves to the created attribute definition object.
 */
export const createAttribute = (attributeData) => {
  return request("/attributes", {
    method: "POST",
    body: JSON.stringify(attributeData),
  });
};

/**
 * Updates an existing attribute definition by its ID.
 * @param {number|string} attributeId - The ID of the attribute definition to update.
 * @param {object} attributeData - The data to update the attribute with.
 * @param {string} [attributeData.attribute_name] - The new name of the attribute.
 * @param {number} [attributeData.unit_type_id] - The new ID of the associated unit type.
 * @param {string} [attributeData.data_type] - The new data type.
 * @param {string} [attributeData.allowed_values] - The new allowed values.
 * @returns {Promise<object>} - A promise that resolves to the updated attribute definition object.
 */
export const updateAttribute = (attributeId, attributeData) => {
  return request(`/attributes/${attributeId}`, {
    method: "PATCH",
    body: JSON.stringify(attributeData),
  });
};

/**
 * Deletes an attribute definition by its ID.
 * @param {number|string} attributeId - The ID of the attribute definition to delete.
 * @returns {Promise<null>} - A promise that resolves to null upon successful deletion.
 */
export const deleteAttribute = (attributeId) => {
  return request(`/attributes/${attributeId}`, {
    method: "DELETE",
  });
};

// =================================================================
// Functions for managing Item Attributes
// =================================================================

/**
 * Assigns an attribute to an item.
 * @param {object} itemAttributeData - The data for the new item-attribute link.
 * @param {number} itemAttributeData.item_id - The ID of the item.
 * @param {number} itemAttributeData.definition_id - The ID of the attribute definition.
 * @param {string} [itemAttributeData.attribute_value] - The value of the attribute.
 * @param {number} [itemAttributeData.unit_id] - The ID of the unit.
 * @returns {Promise<object>} - The created item attribute object.
 */
export const createItemAttribute = (itemAttributeData) => {
  return request("/item-attributes", {
    method: "POST",
    body: JSON.stringify(itemAttributeData),
  });
};

/**
 * Updates an assigned attribute on an item.
 * @param {number|string} attributeId - The ID of the item_attributes record to update.
 * @param {object} itemAttributeData - The data to update.
 * @returns {Promise<object>} - The updated item attribute object.
 */
export const updateItemAttribute = (attributeId, itemAttributeData) => {
  return request(`/item-attributes/${attributeId}`, {
    method: "PATCH",
    body: JSON.stringify(itemAttributeData),
  });
};

/**
 * Deletes an assigned attribute from an item.
 * @param {number|string} attributeId - The ID of the item_attributes record to delete.
 * @returns {Promise<null>}
 */
export const deleteItemAttribute = (attributeId) => {
  return request(`/item-attributes/${attributeId}`, {
    method: "DELETE",
  });
};

/**
 * Fetches a list of all unit definitions (e.g., kg, cm, pcs).
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of unit definitions.
 */
export const getUnitDefinitions = () => {
  return request("/unit-definitions");
};

/**
 * Fetches inventory data for a specific item by its ID.
 * @param {number|string} itemId - The ID of the item.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of inventory entries.
 */
export const getInventoryByItemId = (itemId) => {
  return request(`/inventory/item/${itemId}`);
};

/**
 * Executes an inventory move transaction.
 * @param {object} moveData - The data for the move.
 * @param {number} moveData.item_id - The ID of the item to move.
 * @param {number} moveData.source_location_id - The ID of the source location.
 * @param {number} moveData.destination_location_id - The ID of the destination location.
 * @param {number} moveData.quantity - The quantity to move.
 * @returns {Promise<object>} - A promise that resolves to the success message from the API.
 */
export const moveInventory = (moveData) => {
  return request("/transactions/move-inventory", {
    method: "POST",
    body: JSON.stringify(moveData),
  });
};
