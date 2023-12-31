const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  addToCart,
  removeCartItem,
  updateCartItemQuantity,
  getCartItems,
} = require("../services/cart/cartController");

router.post("/cart/:userId", addToCart);
router.delete("/cart/:id", removeCartItem);
router.put("/cart/product/quantity/:id", updateCartItemQuantity);
router.get("/cart/:userId", getCartItems);

module.exports = router;
