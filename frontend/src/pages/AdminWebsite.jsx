import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import "./AdminDashboard.css";
import "./AdminPanels.css";

const FEEDBACK_STORAGE_KEY = "websiteFeedbacks";

export default function AdminWebsite() {
  const [products, setProducts] = useState([]);
  const [feedbackList, setFeedbackList] = useState(() => {
    const savedFeedbacks = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });
  const [feedbackForm, setFeedbackForm] = useState({
    title: "",
    type: "image",
    mediaUrl: "",
    note: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data.map((item) => ({ ...item, showOnHome: !!item.showOnHome })));
      } catch {
        console.warn("Products API unavailable in website manager.");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackList));
  }, [feedbackList]);

  const featuredCount = useMemo(
    () => products.filter((product) => product.showOnHome).length,
    [products]
  );

  const toggleProductInHome = async (productId, showOnHome) => {
    try {
      await API.put(`/admin/products/${productId}`, { showOnHome });
    } catch {
      console.warn("Home visibility API not ready, applying local state only.");
    }

    setProducts((prev) =>
      prev.map((product) =>
        product._id === productId ? { ...product, showOnHome } : product
      )
    );
  };

  const addFeedback = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: Date.now().toString(),
      ...feedbackForm,
      createdAt: new Date().toISOString()
    };
    setFeedbackList((prev) => [newFeedback, ...prev]);
    setFeedbackForm({ title: "", type: "image", mediaUrl: "", note: "" });
  };

  const removeFeedback = (id) => {
    setFeedbackList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Manage Website</h1>
          <p className="admin-page-subtitle">
            Choose homepage products and curate feedback media from clients.
          </p>
        </div>
      </div>

      <div className="admin-panel">
        <h3>Homepage Product Visibility</h3>
        <p className="admin-page-subtitle">{featuredCount} products visible on Home page.</p>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Homepage Visibility</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${Number(product.price || 0).toFixed(2)}</td>
                  <td>
                    <button
                      className={`btn ${product.showOnHome ? "btn-primary" : "btn-secondary"}`}
                      onClick={() =>
                        toggleProductInHome(product._id, !product.showOnHome)
                      }
                    >
                      {product.showOnHome ? "Visible" : "Hidden"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-panel">
        <h3>Add Feedback Media</h3>
        <form onSubmit={addFeedback}>
          <div className="admin-grid-2">
            <input
              className="admin-input"
              placeholder="Title"
              value={feedbackForm.title}
              onChange={(e) => setFeedbackForm((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <select
              className="admin-select"
              value={feedbackForm.type}
              onChange={(e) => setFeedbackForm((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input
              className="admin-input"
              placeholder="Media URL (image/video)"
              value={feedbackForm.mediaUrl}
              onChange={(e) =>
                setFeedbackForm((prev) => ({ ...prev, mediaUrl: e.target.value }))
              }
              required
            />
            <input
              className="admin-input"
              placeholder="Short note"
              value={feedbackForm.note}
              onChange={(e) => setFeedbackForm((prev) => ({ ...prev, note: e.target.value }))}
            />
          </div>
          <div className="admin-actions-row" style={{ marginTop: "10px" }}>
            <button className="btn btn-primary" type="submit">
              Add Feedback
            </button>
          </div>
        </form>
      </div>

      <div className="admin-panel">
        <h3>Saved Feedback Entries</h3>
        {feedbackList.length === 0 ? (
          <p className="admin-page-subtitle">No feedback entries yet.</p>
        ) : (
          <div className="stats-grid">
            {feedbackList.map((item) => (
              <div key={item.id} className="action-card">
                <h3>{item.title}</h3>
                <p>
                  <strong>Type:</strong> {item.type}
                </p>
                <p style={{ wordBreak: "break-all" }}>
                  <strong>Media:</strong> {item.mediaUrl}
                </p>
                {item.note && <p><strong>Note:</strong> {item.note}</p>}
                <button className="btn btn-danger" onClick={() => removeFeedback(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}