import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import { isAdminLoggedIn } from './adminAuth.js';

function RequireAdmin({ children }) {
  return isAdminLoggedIn() ? children : <Navigate to="/admin/login" replace />;
}

function RedirectIfAdmin({ children }) {
  return isAdminLoggedIn() ? <Navigate to="/admin" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin/login"
            element={
              <RedirectIfAdmin>
                <AdminLogin />
              </RedirectIfAdmin>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <RequireAdmin>
                <AdminOrders />
              </RequireAdmin>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
