import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,

    images: [String],
    stock: { type: Number, required: true, default: 0 },

    height: { type: Number },
    weight: { type: Number },
    diameter: { type: Number },
    volume: { type: Number },

    featured: { type: Boolean, default: false },
    showOnHome: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);