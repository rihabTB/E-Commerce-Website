import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  total: { type: Number, default: 0 }
}, { timestamps: true });

cartSchema.pre("save", function() {
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export default mongoose.model("Cart", cartSchema);