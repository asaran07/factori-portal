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
