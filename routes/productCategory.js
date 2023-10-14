const express = require("express");
const router = express.Router();
const { uploadImage } = require("../utils/s3-config/fileUploadConfig");

const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
  createFeaturedCategory,
} = require("../services/product-category/productCategoryController");

router.post(
  "/categories/create",
  ensureAdmin,
  uploadImage.single("category-image"),
  createProductCategory
);
router.get("/categories", getProductCategories);
router.put("/categories/:id", ensureAdmin, updateProductCategory);
router.delete("/categories/:id", ensureAdmin, deleteProductCategory);
router.put("/categories/featured/:id", ensureAdmin, createFeaturedCategory);

module.exports = router;
