import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import basket from "../assets/basket.png";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuthStore();
  const { getCart, getCartCount } = useCartStore();
  const [cartCount, setCartCount] = useState(0);

  //update cart when user changes
  useEffect(() => {
    if (authUser) {
      getCart();
    }
  }, [authUser, getCart]);

  //update cart count display
  useEffect(() => {
    setCartCount(getCartCount());
  }, [getCartCount]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/"><img src={logo2} alt="logo" /></a>
      </div>

      <ul className="navbar-links">
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/feedbacks">Feedbacks</Link></li>   {/*not fully finished yet*/}
      </ul>

      {/*cart icon*/}
      <div className="cart-icon-wrapper">
        <img 
          src={basket} 
          alt="Cart" 
          className="icon2"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        />
        {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span>
        )}
      </div>
    </nav>
  );
}