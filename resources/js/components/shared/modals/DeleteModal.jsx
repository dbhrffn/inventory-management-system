import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message, isLoading }) {
  const handleClose = (event, reason) => {
    // Prevent closing during loading or by backdrop click when loading
    if (isLoading) return;
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={isLoading}
    >
      <Box sx={{ textAlign: 'center', pt: 3 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'error.light',
            color: 'error.main',
            mb: 2,
          }}
        >
          <WarningIcon fontSize="large" />
        </Box>
      </Box>

      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        {title || 'Confirm Delete'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={isLoading}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          variant="contained"
          color="error"
          sx={{ minWidth: 100 }}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
