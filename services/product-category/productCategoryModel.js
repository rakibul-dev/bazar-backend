const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["deleted", "approved"],
      default: "approved",
    },
    image: {
      type: String,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = ProductCategory;
