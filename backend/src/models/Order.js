import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: String,
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      shippingType: String,
      wilaya: String,
      baladiya: String,
      street: String,
      note: String
    },

    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number
      }
    ],

    totalAmount: Number,
    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);