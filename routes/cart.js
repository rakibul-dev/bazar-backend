const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const {
  addToCart,
  removeCartItem,
} = require("../services/cart/cartController");

router.post("/cart/:userId", addToCart);
router.put("/cart/:userId", removeCartItem);

module.exports = router;
