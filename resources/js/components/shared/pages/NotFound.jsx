import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { SentimentDissatisfied as SadIcon, Home as HomeIcon, ArrowBack as BackIcon } from '@mui/icons-material';

export default function NotFound({ message = 'Page not found', autoRedirect = false, redirectDelay = 3000 }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        navigate('/', { state: { message: 'Item not found', type: 'error' } });
      }, redirectDelay);
      return () => clearTimeout(timer);
    }
  }, [autoRedirect, redirectDelay, navigate]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', py: 12 }}>
      <Box sx={{ mb: 6 }}>
        <SadIcon sx={{ fontSize: 96, color: 'text.disabled' }} />
      </Box>

      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="semibold" color="text.primary">
        {message}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        {autoRedirect
          ? `Redirecting you back to the inventory list in ${redirectDelay / 1000} seconds...`
          : 'The item you are looking for does not exist or may have been deleted.'}
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
        >
          Go to Inventory List
        </Button>
        <Button
          onClick={() => window.history.back()}
          variant="outlined"
          size="large"
          startIcon={<BackIcon />}
        >
          Go Back
        </Button>
      </Stack>
    </Box>
  );
}
