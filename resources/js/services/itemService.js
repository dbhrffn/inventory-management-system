import api from '../lib/axios.js';

/**
 * Get all items from the API
 * @returns {Promise<Array>} Array of items
 */
export const getAllItems = async () => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get a single item by ID
 * @param {string|number} id - Item ID
 * @returns {Promise<Object>} Item object
 */
export const getItem = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a new item
 * @param {Object} data - Item data with name and quantity
 * @returns {Promise<Object>} Created item object
 */
export const createItem = async (data) => {
  try {
    const response = await api.post('/items', data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update an existing item
 * @param {string|number} id - Item ID
 * @param {Object} data - Updated item data
 * @returns {Promise<Object>} Updated item object
 */
export const updateItem = async (id, data) => {
  try {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete an item
 * @param {string|number} id - Item ID
 * @returns {Promise<void>}
 */
export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Handle axios errors and extract meaningful error messages
 * @param {Error} error - Axios error object
 * @returns {Error} Formatted error with message
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    if (data && data.message) {
      return new Error(data.message);
    }

    if (data && data.errors) {
      // Validation errors from Laravel
      const firstError = Object.values(data.errors)[0];
      return new Error(Array.isArray(firstError) ? firstError[0] : firstError);
    }

    switch (status) {
      case 404:
        return new Error('Item not found');
      case 422:
        return new Error('Validation failed. Please check your input.');
      case 500:
        return new Error('Server error. Please try again later.');
      default:
        return new Error(`Request failed with status ${status}`);
    }
  } else if (error.request) {
    // Request was made but no response received
    return new Error('Network error. Please check your connection.');
  } else {
    // Something else happened
    return new Error(error.message || 'An unexpected error occurred');
  }
};
