import { create } from "zustand";
import API from "../services/api";

const useCartStore = create((set, get) => ({
  cart: { items: [], total: 0 },
  isLoading: false,
  error: null,

  //get cart
  getCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.get("/cart");
      set({ cart: res.data.cart, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.error || err.message, isLoading: false });
    }
  },

  //add to cart
  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.post("/cart/add", { productId, quantity });
      set({ cart: res.data.cart, isLoading: false });
      return res.data.cart;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //update quantity
  updateQuantity: async (productId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.put("/cart/update", { productId, quantity });
      set({ cart: res.data.cart, isLoading: false });
      return res.data.cart;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //remove from cart
  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.delete(`/cart/remove/${productId}`);
      set({ cart: res.data.cart, isLoading: false });
      return res.data.cart;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //clear cart
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await API.delete("/cart/clear");
      set({ cart: { items: [], total: 0 }, isLoading: false });
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      set({ error: errorMsg, isLoading: false });
      throw errorMsg;
    }
  },

  //count total items
  getCartCount: () => {
    const { cart } = get();
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  //clear error
  clearError: () => set({ error: null }),
}));

export default useCartStore;