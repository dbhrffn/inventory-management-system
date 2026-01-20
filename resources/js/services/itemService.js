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
 * Custom error class for API errors with status code
 */
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNotFound = status === 404;
  }
}

/**
 * Handle axios errors and extract meaningful error messages
 * @param {Error} error - Axios error object
 * @returns {ApiError} Formatted error with message and status
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    let message = '';

    if (data && data.message) {
      message = data.message;
    } else if (data && data.errors) {
      // Validation errors from Laravel
      const firstError = Object.values(data.errors)[0];
      message = Array.isArray(firstError) ? firstError[0] : firstError;
    } else {
      // Default messages based on status
      switch (status) {
        case 404:
          message = 'Item not found';
          break;
        case 422:
          message = 'Validation failed. Please check your input.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = `Request failed with status ${status}`;
      }
    }

    return new ApiError(message, status);
  } else if (error.request) {
    // Request was made but no response received
    return new ApiError('Network error. Please check your connection.', null);
  } else {
    // Something else happened
    return new ApiError(error.message || 'An unexpected error occurred', null);
  }
};

// Export ApiError for use in components
export { ApiError };
