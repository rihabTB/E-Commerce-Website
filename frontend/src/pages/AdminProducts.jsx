import { useState, useEffect, useCallback } from "react";
import API, { assetUrl } from "../services/api";
import "./AdminDashboard.css";
import "./AdminPanels.css";
import "./AdminProducts.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    height: "",
    weight: "",
    diameter: "",
    volume: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const revokePreview = useCallback(() => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => revokePreview();
  }, [revokePreview]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    revokePreview();
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    revokePreview();
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      height: "",
      weight: "",
      diameter: "",
      volume: ""
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const buildFormData = () => {
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        fd.append(key, value);
      }
    });

    if (imageFile) {
      fd.append("image", imageFile);
    }

    return fd;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!editingId && !imageFile) {
      alert("Image is required");
      return;
    }

    try {
      const fd = buildFormData();

      if (editingId) {
        await API.put(`/admin/products/${editingId}`, fd);
      } else {
        await API.post("/admin/products", fd);
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const handleEditProduct = (product) => {
    revokePreview();

    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      category: product.category || "",
      height: product.height || "",
      weight: product.weight || "",
      diameter: product.diameter || "",
      volume: product.volume || ""
    });

    setImagePreview(product.images?.[0] ? assetUrl(product.images[0]) : null);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await API.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Manage Products</h1>

        <button
          className="btn btn-primary"
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="admin-panel">
          <form onSubmit={handleAddProduct}>

            <div className="admin-grid-2">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
              <input name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} />

              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />

            {/*dimentions*/}
            <h3 style={{ marginTop: "15px" }}>Dimensions (optional)</h3>

            <div className="admin-grid-2">
              <input name="height" placeholder="Height" value={formData.height} onChange={handleInputChange} />
              <input name="weight" placeholder="Weight" value={formData.weight} onChange={handleInputChange} />
              <input name="diameter" placeholder="Diameter" value={formData.diameter} onChange={handleInputChange} />
              <input name="volume" placeholder="Volume" value={formData.volume} onChange={handleInputChange} />
            </div>

            {/*image*/}
            <div style={{ marginTop: "10px" }}>
              <input type="file" accept="image/*" onChange={handleImageChange} />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt=""
                  style={{ width: 120, marginTop: 10, borderRadius: 8 }}
                />
              )}
            </div>

            <button className="btn btn-primary" type="submit">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      <div className="admin-panel">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Img</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={assetUrl(p.images?.[0]) || "https://via.placeholder.com/40"}
                      style={{ width: 40, height: 40 }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.stock}</td>

                  <td>
                    <button onClick={() => handleEditProduct(p)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}