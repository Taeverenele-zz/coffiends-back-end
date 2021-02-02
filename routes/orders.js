const express = require("express");
const {
  getOrders,
  createOrder,
  getPastOrders,
  setOrderComplete,
  successWriteOrder
} = require("../controllers/orders.js");

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/past", getPastOrders);
router.put("/:id", setOrderComplete);
router.get("/success", successWriteOrder);

module.exports = router;
