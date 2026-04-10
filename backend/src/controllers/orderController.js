import Order from "../models/Order.js";
import Product from "../models/Product.js";

//create a new order
export const createOrder = async (req, res) => {
  try {
    console.log("ORDER RECEIVED:", req.body);

    const { customer, items } = req.body;

    // ✅ calculate total
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = await Order.create({
      customer,
      items,
      totalAmount,        
      status: "pending"  
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

//get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};