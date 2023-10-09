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
    },
    image: {
      type: String,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
  },
  { timestamps: true }
);

const productCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = productCategory;
