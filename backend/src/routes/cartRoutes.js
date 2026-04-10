import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/cartController.js";
import { checkout } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", asyncHandler(getCart));
router.post("/add", asyncHandler(addToCart));
router.put("/update", asyncHandler(updateCartItem));
router.delete("/remove/:productId", asyncHandler(removeFromCart));
router.delete("/clear", asyncHandler(clearCart));
router.post("/checkout", checkout);

export default router;