const express = require("express");
const {
  setOrderComplete,
  successWriteOrder
} = require("../controllers/orders.js");
const router = express.Router();

router.put("/:id", setOrderComplete);
router.get("/success", successWriteOrder);

module.exports = router;
