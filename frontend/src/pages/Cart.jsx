import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart, getCart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  useEffect(() => {
    if (user) getCart();
  }, [user]);

  useEffect(() => {
    if (user === false) navigate("/login");
  }, [user, navigate]);

  const handleQuantityChange = async (productId, qty) => {
    if (qty < 1) return;
    try { await updateQuantity(productId, qty); } catch(err) { alert(err); }
  };

  const handleRemove = async (productId) => {
    if (window.confirm("Remove this item?")) await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm("Clear entire cart?")) await clearCart();
  };

  const handleCheckout = () => {
    if (!cart?.items?.length) return alert("Cart is empty!");
    navigate("/checkout");
  };

  return (
    <>
      <Navbar/>

      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {cart?.items?.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <button onClick={() => navigate("/")} className="cart-continue-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map(item => (
                <div key={item.product._id} className="cart-item">

                  {/*image*/}
                  <img
                    src={item.product.images?.[0] || "https://via.placeholder.com/100"}
                    alt={item.product.name}
                    className="cart-img"
                  />

                  {/*infos*/}
                  <div className="cart-info">
                    <h3>{item.product.name}</h3>
                    <p className="cart-price">{item.price.toLocaleString()} DA each</p>
                  </div>

                  {/*control*/}
                  <div className="cart-controls">
                    <div className="cart-qty-box">
                      <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                    </div>

                    <p className="cart-item-total">
                      {(item.price * item.quantity).toLocaleString()} DA
                    </p>

                    <button
                      className="cart-remove-btn"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total Items</span>
                <span>{cart.items.reduce((sum, i) => sum + i.quantity, 0)}</span>
              </div>

              <div className="cart-summary-total">
                <span>Total Price</span>
                <span>{cart.total.toLocaleString()} DA</span>
              </div>

              <div className="cart-actions">
                <button onClick={handleClearCart} className="cart-clear-btn">
                  Clear Cart
                </button>

                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer/>
    </>
  );
}