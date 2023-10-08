const express = require("express");
const router = express.Router();
const { getUsers, getUserbyId } = require("../services/user/UserController");
// const { userRegiste } = require();
// const UserController = require("../controllers/userController");

// Define your routes here
router.get("/", getUsers);
router.get("/:id", getUserbyId);

module.exports = {
  path: "/users", // Define the base path for these routes
  router,
};
