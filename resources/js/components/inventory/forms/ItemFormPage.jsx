import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { createItem, updateItem, getItem, ApiError } from '../../../services/itemService.js';
import ItemForm from './ItemForm.jsx';

export default function ItemFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from route params (undefined for /add, defined for /edit/:id)
  const isEditMode = !!id;

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);
  const [error, setError] = useState(null);

  // Reset state when switching between add/edit modes or changing items
  useEffect(() => {
    setError(null);
    setItem(null);
    setIsFetching(isEditMode);
    
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
          state: { message: 'Item updated successfully!', type: 'success' }
        });
      } else {
        await createItem(formData);
        navigate('/', {
          state: { message: 'Item created successfully!', type: 'success' }
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
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
          <CircularProgress size={48} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          {isEditMode ? 'Edit Item' : 'Create New Item'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {isEditMode ? 'Update the item details' : 'Add a new item to your inventory'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <ItemForm
          item={item}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </Paper>
    </Box>
  );
}
