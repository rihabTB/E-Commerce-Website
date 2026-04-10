import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";
import "./AdminPanels.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await API.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statuses = useMemo(
    () => ["pending", "processing", "delivered", "cancelled"],
    []
  );

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}`, { status: newStatus });
    } catch (err) {
      console.warn("Failed to update status:", err);
    }

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Orders</h1>
          <p className="admin-page-subtitle">
            View orders and update delivery status.
          </p>
        </div>

        <div className="admin-actions-row">
          <button
            className={`btn ${viewMode === "table" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setViewMode("table")}
          >
            Table View
          </button>

          <button
            className={`btn ${viewMode === "cards" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setViewMode("cards")}
          >
            Card View
          </button>
        </div>
      </div>

      <div className="admin-panel">
        {loading && <p>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p style={{ textAlign: "center" }}>No orders found.</p>
        )}

        {!loading && viewMode === "table" && orders.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>

                    <td>
                      <div>{order.customer?.name}</div>
                      <small>{order.customer?.phone}</small>
                    </td>
                    <td>
                      <div className="order-address">
                        <p>
                          <strong>Delivery:</strong>{" "}
                          {order.customer?.shippingType || "N/A"}
                        </p>

                        <p>
                          <strong>Wilaya:</strong>{" "}
                         {order.customer?.wilaya || "N/A"}
                        </p>

                        <p>
                          <strong>Baladiya:</strong>{" "}
                          {order.customer?.baladiya || "N/A"}
                        </p>

                          {order.customer?.street && (
                        <p>
                          <strong>Address:</strong> {order.customer.street}
                        </p>
                          )}

                        {order.customer?.note && (
                        <p>
                          <strong>Note:</strong> {order.customer.note}
                        </p>
                          )}
                      </div>

                    </td>

                    <td>
                      {order.items
                        ?.map(
                          (item) =>
                            `${item.name} x${item.quantity}`
                        )
                        .join(", ")}
                    </td>

                    <td>
                      {Number(order.totalAmount || 0).toLocaleString()} DA
                    </td>

                    <td>
                      <span className={`chip chip-${order.status}`}>
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <select
                        className="admin-select"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && viewMode === "cards" && orders.length > 0 && (
          <div className="stats-grid">
            {orders.map((order) => (
              <div className="action-card" key={order._id}>
                <h3>Order {order._id}</h3>

                <p>
                  <strong>Customer:</strong> {order.customer?.name}
                </p>

                <p>
                  <strong>Phone:</strong> {order.customer?.phone}
                </p>

                <p>
                  <strong>Items:</strong>{" "}
                  {order.items
                    ?.map((item) => `${item.name} x${item.quantity}`)
                    .join(", ")}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  {Number(order.totalAmount || 0).toLocaleString()} DA
                </p>

                <div className="admin-actions-row">
                  <span className={`chip chip-${order.status}`}>
                    {order.status}
                  </span>

                  <select
                    className="admin-select"
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}