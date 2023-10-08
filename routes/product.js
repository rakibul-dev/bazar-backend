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

router.get("/", getProducts);

router.post("/create", ensureAdmin, createProduct);

router.put("/:id", ensureAdmin, updateProduct);

router.put("/:productId/variant/:variantId", ensureAdmin, updateProductVariant);
router.delete(
  "/:productId/variant/:variantId",
  ensureAdmin,
  deleteProductVariant
);

router.put("/:productId/variant", ensureAdmin, addNewProductVraiant);
module.exports = {
  path: "/products",
  router,
};
