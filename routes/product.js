const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  createProduct,
  updateProduct,
  getProducts,
  updateProductVariant,
  deleteProductVariant,
  addNewProductVraiant,
} = require("../services/products/productController");

router.get("/products", getProducts);

router.post("/products/create", ensureAdmin, createProduct);

router.put("/products/:id", ensureAdmin, updateProduct);

router.put(
  "/products/:productId/variant/:variantId",
  ensureAdmin,
  updateProductVariant
);
router.delete(
  "/products/:productId/variant/:variantId",
  ensureAdmin,
  deleteProductVariant
);

router.put("/products/:productId/variant", ensureAdmin, addNewProductVraiant);
module.exports = router;
