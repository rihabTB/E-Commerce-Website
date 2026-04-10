import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/cartStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../checkout.css";
import API from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    shippingType: "bureau", //default shipping
    wilaya: "",
    baladiya: "",
    street: "",
    note: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (err) {
        console.error(err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    if (!cart) fetchCart();
    else setLoading(false);
  }, [cart, getCart]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading cart...</p>;

  if (!cart?.items?.length)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Cart is empty!</p>
        <button onClick={() => navigate("/")}>Go Shopping</button>
      </div>
    );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
  const { name, phone, shippingType, wilaya, baladiya } = formData;

  if (!name || !phone || !shippingType || !wilaya || !baladiya) {
    return alert("Please fill all required fields!");
  }

  if (shippingType === "house" && !formData.street) {
    return alert("Please provide street address for house delivery.");
  }

  setPlacing(true);
  setError(null);

  try {
    const orderPayload = {
      customer: {
        name: formData.name,
        phone: formData.phone,
        shippingType: formData.shippingType,
        wilaya: formData.wilaya,
        baladiya: formData.baladiya,
        street: formData.street,
        note: formData.note
      },

      items: cart.items.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    await API.post("/orders", orderPayload);

    await clearCart();

    alert("Order placed successfully!");
    navigate("/");
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || "Order failed");
  } finally {
    setPlacing(false);
  }
};

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        {error && <p className="checkout-error">{error}</p>}

        <div className="checkout-items">
          {cart.items.map((item) => (
            <div key={item.product._id} className="checkout-item">
              <img
                src={item.product.images?.[0] || "https://via.placeholder.com/100"}
                alt={item.product.name}
              />
              <div className="checkout-info">
                <p>{item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {(item.price * item.quantity).toLocaleString()} DA</p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-total">
          <strong>Total:</strong> {cart.total.toLocaleString()} DA
        </div>

        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Shipping Info</h2>
          <div className="form-group">
            <label>Nom et prénom *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom complet"
            />
          </div>

          <div className="form-group">
            <label>Numéro de téléphone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0612345678"
            />
          </div>

          <h3>Shipping Type *</h3>
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="shippingType"
                value="bureau"
                checked={formData.shippingType === "bureau"}
                onChange={handleChange}
              />
              Bureau (Pickup)
            </label>
            <label>
              <input
                type="radio"
                name="shippingType"
                value="house"
                checked={formData.shippingType === "house"}
                onChange={handleChange}
              />
              House (Delivery)
            </label>
          </div>

          <h3>Address</h3>
          <div className="form-group">
            <label>Wilaya *</label>
            <select
              name="wilaya"
              value={formData.wilaya}
              onChange={handleChange}
              required
            >
              <option value="">Select Wilaya</option>
              <option value="Adrar">Adrar</option>
              <option value="Chlef">Chlef</option>
              <option value="Laghouat">Laghouat</option>
              <option value="Oum El Bouaghi">Oum El Bouaghi</option>
              <option value="Batna">Batna</option>
              <option value="Béjaïa">Béjaïa</option>
              <option value="Biskra">Biskra</option>
              <option value="Béchar">Béchar</option>
              <option value="Blida">Blida</option>
              <option value="Bouira">Bouira</option>
              <option value="Tamanrasset">Tamanrasset</option>
              <option value="Tébessa">Tébessa</option>
              <option value="Tlemcen">Tlemcen</option>
              <option value="Tiaret">Tiaret</option>
              <option value="Tizi Ouzou">Tizi Ouzou</option>
              <option value="Algiers">Algiers</option>
              <option value="Djelfa">Djelfa</option>
              <option value="Jijel">Jijel</option>
              <option value="Sétif">Sétif</option>
              <option value="Saïda">Saïda</option>
              <option value="Skikda">Skikda</option>
              <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
              <option value="Annaba">Annaba</option>
              <option value="Guelma">Guelma</option>
              <option value="Constantine">Constantine</option>
              <option value="Médéa">Médéa</option>
              <option value="Mostaganem">Mostaganem</option>
              <option value="M’Sila">M’Sila</option>
              <option value="Mascara">Mascara</option>
              <option value="Ouargla">Ouargla</option>
              <option value="Oran">Oran</option>
              <option value="El Bayadh">El Bayadh</option>
              <option value="Illizi">Illizi</option>
              <option value="Bordj Bou Arréridj">Bordj Bou Arréridj</option>
              <option value="Boumerdès">Boumerdès</option>
              <option value="El Tarf">El Tarf</option>
              <option value="Tindouf">Tindouf</option>
              <option value="Tissemsilt">Tissemsilt</option>
              <option value="El Oued">El Oued</option>
              <option value="Khenchela">Khenchela</option>
              <option value="Souk Ahras">Souk Ahras</option>
              <option value="Tipaza">Tipaza</option>
              <option value="Mila">Mila</option>
              <option value="Aïn Defla">Aïn Defla</option>
              <option value="Naâma">Naâma</option>
              <option value="Aïn Témouchent">Aïn Témouchent</option>
              <option value="Ghardaïa">Ghardaïa</option>
              <option value="Relizane">Relizane</option>

              <option value="Timimoun">Timimoun</option>
              <option value="Bordj Badji Mokhtar ">Bordj Badji Mokhtar </option>
              <option value="Ouled Djellal">Ouled Djellal</option>
              <option value="Béni Abbès">Béni Abbès</option>
              <option value="In Salah">In Salah</option>
              <option value="In Guezzam">In Guezzam</option>
              <option value="Touggourt">Touggourt</option>
              <option value="Djanet">Djanet</option>
              <option value="El M'Ghair">El M'Ghair</option>
              <option value="El Meniaa">El Meniaa</option> 

              <option value="Aflou">Aflou</option>
              <option value="El Abiodh Sidi Cheikh">El Abiodh Sidi Cheikh</option>
              <option value="El Aricha">El Aricha</option>
              <option value="El Kantara">El Kantara</option>
              <option value="Barika">Barika</option>
              <option value="Bou Saâda">Bou Saâda</option>
              <option value="Bir El Ater">Bir El Ater</option>
              <option value="Ksar El Boukhari">Ksar El Boukhari</option>
              <option value="Ksar Chellala">Ksar Chellala</option>
              <option value="Aïn Oussera">Aïn Oussera</option>
              <option value="Messaad">Messaad</option>
            </select>

          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Baladiya *</label>
              <input
                type="text"
                name="baladiya"
                value={formData.baladiya}
                onChange={handleChange}
                required
                placeholder="Baladiya"
              />
            </div>

            {formData.shippingType === "house" && (
              <div className="form-group">
                <label>Adresse *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Votre Adresse"
                  required={formData.shippingType === "house"}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Note (optional)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Vous pouvez ajouter un commentaire..."
            />
          </div>
        </form>

        <button
          className="checkout-btn"
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? "Placing..." : "Place Order"}
        </button>
      </div>
      <Footer />
    </>
  );
}