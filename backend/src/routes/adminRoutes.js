import express from "express";
import {
  getAdminStats,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/adminController.js";

import { optionalUploadProductImage } from "../middleware/uploadProductImage.js";
import { adminKeyMiddleware } from "../middleware/adminKeyMiddleware.js";

const router = express.Router();

const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

//stats
router.get("/stats", adminKeyMiddleware, asyncWrap(getAdminStats));

//products
router.get("/products", adminKeyMiddleware, asyncWrap(getAllProducts));

router.post(
  "/products",
  adminKeyMiddleware,
  optionalUploadProductImage,
  asyncWrap(createProduct)
);

router.put(
  "/products/:productId",
  adminKeyMiddleware,
  optionalUploadProductImage,
  asyncWrap(updateProduct)
);

router.delete(
  "/products/:productId",
  adminKeyMiddleware,
  asyncWrap(deleteProduct)
);

export default router;