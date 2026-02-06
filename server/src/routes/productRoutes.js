import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: Get all products
// Admin: Create product
router.route("/")
  .get(getAllProducts)
  .post(protect, adminOnly, createProduct);

// Public: Get one product
// Admin: Update/Delete product
router.route("/:id")
  .get(getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

export default router;
