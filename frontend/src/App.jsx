import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminWebsite from "./pages/AdminWebsite";
import Products from "./pages/Products";
import Feedbacks from "./pages/Feedbacks";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import useAuthStore from "./store/authStore";
import Checkout from "./pages/Checkout";

function App() {
  const { getCurrentUser } = useAuthStore();

  //check if user is logged in on app load
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/feedbacks" element={<Feedbacks />} />
      <Route path="/products" element={<Products />} />
      <Route path="/checkout" element={<Checkout />} />


      <Route
        path="/admin"
        element={
          //<ProtectedRoute requiredRole="admin">
            <AdminLayout />
          //</ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="website" element={<AdminWebsite />} />
      </Route>
    </Routes>
  );
}

export default App;