import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getAllItems, deleteItem } from '../../../services/itemService.js';
import DeleteModal from '../../shared/modals/DeleteModal.jsx';
import { formatDate } from '../../../utils/dateFormatter.js';

export default function InventoryList() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    // Handle messages from navigation state
    if (location.state?.message) {
      const { message, type } = location.state;
      
      // Set message based on type (default to success for backward compatibility)
      if (type === 'error') {
        setError(message);
      } else {
        setSuccessMessage(message);
      }
      
      // Clear the location state after reading the message
      window.history.replaceState({}, document.title);
      
      // Auto-hide message after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllItems();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeleteLoading((prev) => ({ ...prev, [itemToDelete.id]: true }));
      setError(null);
      await deleteItem(itemToDelete.id);
      setSuccessMessage('Item deleted successfully!');
      await fetchItems();
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete item');
      setDeleteModalOpen(false);
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [itemToDelete.id]: false }));
    }
  };

  const closeDeleteModal = () => {
    if (!deleteLoading[itemToDelete?.id]) {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Inventory List
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your inventory items
        </Typography>
      </Box>

      {/* Messages */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        {error && (
          <Alert severity="error" onClose={clearMessages}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" onClose={clearMessages}>
            {successMessage}
          </Alert>
        )}
      </Stack>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            py: 12,
            bgcolor: 'grey.50',
            border: 1,
            borderColor: 'grey.200',
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No items found
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
            Get started by creating your first item
          </Typography>
          <Button
            component={Link}
            to="/add"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create First Item
          </Button>
        </Paper>
      )}

      {/* Items Table */}
      {!loading && items.length > 0 && (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>#{item.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.quantity}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/edit/${item.id}`}
                      color="primary"
                      size="small"
                      title="Edit"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(item)}
                      disabled={deleteLoading[item.id]}
                      color="error"
                      size="small"
                      title="Delete"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This action cannot be undone.`}
        isLoading={deleteLoading[itemToDelete?.id]}
      />
    </Box>
  );
}
