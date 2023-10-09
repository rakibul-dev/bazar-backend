const express = require("express");
const router = express.Router();
const { getUsers, getUserbyId } = require("../services/user/UserController");
// const { userRegiste } = require();
// const UserController = require("../controllers/userController");

// Define your routes here
router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);

module.exports = router;
