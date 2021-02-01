const express = require("express");
const { checkout, webhook } = require("../controllers/checkout.js");

const router = express.Router();

router.post("/", checkout);
router.post("/webhook", webhook);

module.exports = router;
