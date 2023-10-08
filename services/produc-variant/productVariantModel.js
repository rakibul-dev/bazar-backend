const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productVariantSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productVariant = mongoose.model("ProductVariant", productVariantSchema);

module.exports = productVariant;
