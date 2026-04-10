import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">{stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="admin-actions">
        <div className="action-card">
          <h3>📦 Products</h3>
          <p>Manage all products in your store</p>
          <Link to="/admin/products" className="btn btn-primary">
            Manage Products
          </Link>
        </div>
        <div className="action-card">
          <h3>📋 Orders</h3>
          <p>Track and manage all orders</p>
          <Link to="/admin/orders" className="btn btn-primary">
            View Orders
          </Link>
        </div>
        <div className="action-card">
          <h3>🛠️ Manage Website</h3>
          <p>Control homepage products and feedback media</p>
          <Link to="/admin/website" className="btn btn-primary">
            Manage Website
          </Link>
        </div>
      </div>
    </div>
  );
}