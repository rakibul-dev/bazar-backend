const express = require("express");
const router = express.Router();
const s3 = require("../utils/s3-config/fileUploadConfig");

const multer = require("multer");
const multerS3 = require("multer-s3");

const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
} = require("../services/product-category/productCategoryController");

const upload = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: "bazar-ghat",
    key: function (req, file, cb) {
      //   console.log("multer req......>", file);
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

router.post(
  "/categories/create",
  upload.single("category-image"),
  createProductCategory
);
router.get("/categories", getProductCategories);
router.put("/categories/:id", ensureAdmin, updateProductCategory);

module.exports = router;
