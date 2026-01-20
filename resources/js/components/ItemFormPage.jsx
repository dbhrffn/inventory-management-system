import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createItem, updateItem, getItem, ApiError } from '../services/itemService.js';
import ItemForm from './ItemForm.jsx';

export default function ItemFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from route params (undefined for /add, defined for /edit/:id)
  const isEditMode = !!id;

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [error, setError] = useState(null);

  // Fetch item data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setIsFetching(true);
      setError(null);
      const data = await getItem(id);
      setItem(data);
    } catch (err) {
      // Navigate to 404 page if item not found
      if (err instanceof ApiError && err.isNotFound) {
        navigate('/404', { replace: true });
        return;
      }
      setError(err.message || 'Failed to fetch item');
      setIsFetching(false);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isEditMode) {
        await updateItem(id, formData);
        navigate('/', {
          state: { message: 'Item updated successfully!' }
        });
      } else {
        await createItem(formData);
        navigate('/', {
          state: { message: 'Item created successfully!' }
        });
      }
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} item`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  // Show loading state while fetching item data
  if (isFetching) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Item' : 'Create New Item'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isEditMode ? 'Update the item details' : 'Add a new item to your inventory'}
        </p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <ItemForm
          item={item}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
