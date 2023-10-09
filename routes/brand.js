const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middlewares/adminMiddleware");

router.post("/brands/create");
router.get("/brands");
router.put("/brands/:id");
router.delete("/brands/:id");

module.exports = router;
