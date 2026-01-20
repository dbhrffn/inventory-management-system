import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import InventoryList from './components/InventoryList.jsx';
import ItemFormPage from './components/ItemFormPage.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
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
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);