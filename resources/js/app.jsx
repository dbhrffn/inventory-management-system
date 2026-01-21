import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/shared/Layout.jsx';
import ItemFormPage from './components/inventory/forms/ItemFormPage.jsx';
import InventoryList from './components/inventory/index/InventoryList.jsx';
import NotFound from './components/shared/pages/NotFound.jsx';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Blue 600
    },
    secondary: {
      main: '#dc2626', // Red 600
    },
    background: {
      default: '#f9fafb', // Gray 50
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<InventoryList />} />
            <Route path="add" element={<ItemFormPage />} />
            <Route path="edit/:id" element={<ItemFormPage />} />
            <Route path="404" element={<NotFound message="Item not found" autoRedirect={true} redirectDelay={3000} />} />
            <Route path="*" element={<NotFound message="Page not found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);