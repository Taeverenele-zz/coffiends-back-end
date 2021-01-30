const express = require("express");
const {
  getOrders,
  createOrder,
  getPastOrders,
  setOrderComplete
} = require("../controllers/orders.js");

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/past", getPastOrders);
router.put("/:id", setOrderComplete);

module.exports = router;
