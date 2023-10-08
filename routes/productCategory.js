const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
} = require("../services/product-category/productCategoryController");

router.post("/create", ensureAdmin, createProductCategory);

router.get("/", getProductCategories);
router.put("/:id", ensureAdmin, updateProductCategory);

module.exports = {
  path: "/categories", // Define the base path for these routes
  router,
};
