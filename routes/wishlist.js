const express = require("express");
const {
  getWishlistItems,
  addToWishlist,
  deleteWishlistItem,
} = require("../services/wishlist/wishlistController");
const router = express.Router();

router.get("/wishlist/:userId", getWishlistItems);
router.post("/wishlist/:userId", addToWishlist);
router.delete("/wishlist/:id", deleteWishlistItem);

module.exports = router;
