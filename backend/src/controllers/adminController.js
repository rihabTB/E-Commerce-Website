import Product from "../models/Product.js";
import Order from "../models/Order.js";

//get admin stats
export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.json({ totalProducts, totalOrders, totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//create product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      height,
      weight,
      diameter,
      volume,
      featured,
      showOnHome
    } = req.body;

    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ error: "Name, price, and stock are required" });
    }

    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

    const product = new Product({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category: category || undefined,

      height: height ? Number(height) : undefined,
      weight: weight ? Number(weight) : undefined,
      diameter: diameter ? Number(diameter) : undefined,
      volume: volume ? Number(volume) : undefined,

      featured: featured === "true" || featured === true,
      showOnHome: showOnHome === "true" || showOnHome === true,

      images: imagePath ? [imagePath] : []
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


//update product
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const body = req.body;

    const updates = {};

    if (body.name !== undefined) updates.name = body.name;
    if (body.description !== undefined) updates.description = body.description;
    if (body.price !== undefined) updates.price = Number(body.price);
    if (body.stock !== undefined) updates.stock = Number(body.stock);
    if (body.category !== undefined) updates.category = body.category;

    if (body.height !== undefined) updates.height = Number(body.height);
    if (body.weight !== undefined) updates.weight = Number(body.weight);
    if (body.diameter !== undefined) updates.diameter = Number(body.diameter);
    if (body.volume !== undefined) updates.volume = Number(body.volume);

    if (body.featured !== undefined)
      updates.featured = body.featured === "true" || body.featured === true;

    if (body.showOnHome !== undefined)
      updates.showOnHome = body.showOnHome === "true" || body.showOnHome === true;

    if (req.file) {
      updates.images = [`/uploads/products/${req.file.filename}`];
    }

    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//updating order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};