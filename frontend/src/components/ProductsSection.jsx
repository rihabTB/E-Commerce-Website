import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import API from "../services/api";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="products-section">
      <h2>Our Products</h2>

      <div className="products-grid">
        {products
          .filter((product) => {
            const hasFeatureFlag = products.some((item) => Object.prototype.hasOwnProperty.call(item, "showOnHome"));
            if (!hasFeatureFlag) return true;
            return product.showOnHome;
          })
          .map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}