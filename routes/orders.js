const express = require("express");
const {
  getOrders,
  createOrder,
} = require("../controllers/orders.js");

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);

module.exports = router;
