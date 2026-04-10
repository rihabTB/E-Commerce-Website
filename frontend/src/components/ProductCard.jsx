import { useNavigate } from "react-router-dom";
import { assetUrl } from "../services/api";
import moneyIcon from "../assets/dinar.png";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
 
  return (
    <div className="product-card"  onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: "pointer" }}>
      <img 
        src={assetUrl(product.images?.[0]) || "https://via.placeholder.com/300"} 
        alt={product.name} 
      />
      <h3>{product.name}</h3>
      <p className="price">
        {product.price}
        <img src={moneyIcon} alt="price" style={{ width: "18px", height: "18px" }}/>
      </p>
      
      <div className="card-buttons">
        <button 
          className="view-btn"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          View Details
        </button>
        
        
      </div>
    </div>
  );
}