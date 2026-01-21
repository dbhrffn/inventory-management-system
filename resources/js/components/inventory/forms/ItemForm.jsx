import { useState, useEffect } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

export default function ItemForm({ item = null, onSubmit, onCancel, isLoading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        quantity: item.quantity || '',
      });
    } else {
      setFormData({
        name: '',
        quantity: '',
      });
    }
    setErrors({});
  }, [item]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 255) {
      newErrors.name = 'Name must not exceed 255 characters';
    }

    if (formData.quantity === '') {
      newErrors.quantity = 'Quantity is required';
    } else {
      const quantity = parseInt(formData.quantity);
      if (isNaN(quantity) || quantity < 0) {
        newErrors.quantity = 'Quantity must be a non-negative integer';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: formData.name.trim(),
        quantity: parseInt(formData.quantity),
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          placeholder="Enter item name"
          disabled={isLoading}
          required
        />

        <TextField
          fullWidth
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          placeholder="Enter quantity"
          disabled={isLoading}
          required
          inputProps={{
            min: 0,
            step: 1,
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            variant="outlined"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            {isLoading ? 'Saving...' : item ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
