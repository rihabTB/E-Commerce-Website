import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

//get cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne().populate("items.product");
    res.json({ cart: cart || { items: [], total: 0 } });
  } catch (err) {
    next(err);
  }
};

//add to cart
export const addToCart = async (req, res, next) => {
  try {
    console.log("BODY:", req.body); 
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (quantity > product.stock) return res.status(400).json({ error: "Not enough stock" });

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [] });

    const existingItem = cart.items.find(i => i.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json({ cart });
  } catch (err) {
    console.error("ADD TO CART ERROR:", err); 
    next(err);
  }
};

//update cart
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.quantity = quantity;

    await cart.save();
    await cart.populate("items.product");

    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

//remove from cart
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(i => i.product.toString() !== productId);

    await cart.save();
    await cart.populate("items.product");

    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

//clear cart
export const clearCart = async (req, res, next) => {
  try {
    await Cart.deleteMany();
    res.json({ cart: { items: [], total: 0 } });
  } catch (err) {
    next(err);
  }
};


//checkout
export const checkout = async (req, res) => {
  try {
    const { customer } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ error: "Customer info is required" });
    }

    const cart = await Cart.findOne().populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for ${product.name}`
        });
      }

      //reduce stock
      product.stock -= item.quantity;
      await product.save();

      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: item.price
      });
    }

    const order = new Order({
      customer,
      items: orderItems,
      totalAmount: cart.total
    });

    await order.save();

    //clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({ message: "Order placed successfully", order });

  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};