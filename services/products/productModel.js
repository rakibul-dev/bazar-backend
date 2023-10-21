const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    description: {
      type: String,
      //   required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      //   required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    image: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
    },
    statue: {
      type: String,
      default: "pending",
    },
    regular_price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    variants: [
      {
        size: {
          type: String,
          // required: true,
        },
        color: {
          type: String,
          // required: true,
        },
        price: {
          type: Number,
          // required: true,
        },
        quantity: {
          type: Number,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
