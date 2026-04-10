import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//importing routes
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

//app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://e-commerce-website-mu-ten-62.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);


//test
app.get("/api/test", (_req, res) => {
  res.json({ message: "API is working" });
});

//global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

//connect DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✓ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  });