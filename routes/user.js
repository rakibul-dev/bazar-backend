const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserbyId,
  getCustomers,
} = require("../services/user/UserController");
const { ensureAdmin } = require("../middlewares/adminMiddleware");

router.get("/users", getUsers);
router.get("/users/customer", ensureAdmin, getCustomers);
router.get("/users/:id", getUserbyId);

module.exports = router;
