const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserbyId,
  getCustomers,
  getUser,
} = require("../services/user/UserController");
const { ensureAdmin } = require("../middlewares/adminMiddleware");

router.get("/users", getUsers);
router.get("/users/customer", ensureAdmin, getCustomers);
router.get("/users/:id", getUserbyId);
router.get("/user", getUser);

module.exports = router;
