import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API, { assetUrl } from "../services/api";
import useCartStore from "../store/cartStore";
import moneyIcon from "../assets/dinar.png";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setMainImage(assetUrl(res.data.images?.[0]) || "https://via.placeholder.com/400");
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      alert("Added to cart!");
    } catch (err) {
      alert(err);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  if (!product) return <p style={{ textAlign: "center" }}>Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="back-container">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      </div>

      <div className="details-container">
        <div className="product-details">

          <div className="details-images">
            <img src={mainImage} alt={product.name} className="main-image" />
            {product.images?.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((img, idx) => (
                  <img key={idx} src={assetUrl(img)} alt={`${product.name}-${idx}`} 
                       onClick={() => setMainImage(assetUrl(img))} className="thumbnail" />
                ))}
              </div>
            )}
          </div>

          <div className="details-info">
            <h1>{product.name}</h1>
            <p className="price">
              {product.price.toLocaleString()}
              <img src={moneyIcon} alt="price" style={{ width: "20px", height: "20px", marginLeft: "5px" }} />
            </p>

            {product.material && <p><strong>Material:</strong> {product.material}</p>}
            {product.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}
            {/*dimensions section */}
            {(product.height || product.diameter || product.weight || product.volume) && (
              <div className="dimensions">
                <h3>Dimensions</h3>
                {product.height && <p><strong>Height:</strong> {product.height} cm</p>}
                {product.diameter && <p><strong>Diameter:</strong> {product.diameter} cm</p>}
                {product.weight && <p><strong>Weight:</strong> {product.weight} kg</p>}
                {product.volume && <p><strong>Volume:</strong> {product.volume} L</p>}
              </div>
        )}

            {/*quantity selector */}
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
            </div>

            <button className="add-to-cart-btn" disabled={product.stock <= 0} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}