const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const { uploadImage } = require("../utils/s3-config/fileUploadConfig");
const {
  createProduct,
  updateProduct,
  getProducts,
  updateProductVariant,
  deleteProductVariant,
  addNewProductVraiant,
} = require("../services/products/productController");

router.get("/products", getProducts);

router.post(
  "/products/create",
  ensureAdmin,
  uploadImage.array("product_image", 3),
  createProduct
);

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
