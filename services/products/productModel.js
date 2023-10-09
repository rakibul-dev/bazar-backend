const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: [{ type: String }],
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
