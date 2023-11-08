const express = require("express");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const { ensureAdmin } = require("../middlewares/adminMiddleware");
const { createOrder, getOrders } = require("../services/order/orderController");
const router = express.Router();

router.get("/orders/customer/:userId", ensureAuthenticated, getOrders);
router.post("/orders/customer/:userId", ensureAuthenticated, createOrder);

module.exports = router;
