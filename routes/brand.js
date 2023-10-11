const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require("../services/brand/brandControler");
const { uploadImage } = require("../utils/s3-config/fileUploadConfig");

router.post(
  "/brands/create",
  ensureAdmin,
  uploadImage.single("brand-image"),
  createBrand
);
router.get("/brands", getBrands);
router.put("/brands/:id", ensureAdmin, updateBrand);
router.delete("/brands/:id", ensureAdmin, deleteBrand);

module.exports = router;
