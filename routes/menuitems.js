const express = require("express");
const {
  getMenuItems,
  createMenuItem,
  getOneMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItems.js");

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", createMenuItem);
router.get("/:id", getOneMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;
