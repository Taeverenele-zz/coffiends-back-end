const express = require("express");
const { checkout } = require("../controllers/checkout.js");

const router = express.Router();

router.post("/", checkout);

module.exports = router;
