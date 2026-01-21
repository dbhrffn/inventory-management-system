import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Inventory as InventoryIcon, Add as AddIcon } from '@mui/icons-material';

export default function Layout() {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <InventoryIcon sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              component="h1"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              Inventory Management System
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                component={Link}
                to="/"
                variant={location.pathname === '/' ? 'contained' : 'text'}
                color="primary"
              >
                Inventory List
              </Button>
              <Button
                component={Link}
                to="/add"
                variant={location.pathname === '/add' ? 'contained' : 'text'}
                color="primary"
                startIcon={<AddIcon />}
              >
                Add Item
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
