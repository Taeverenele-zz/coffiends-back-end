const express = require("express");
const {
  selectMapCafes,
} = require("../controllers/map.js");

const router = express.Router();

router.post("/", selectMapCafes);

module.exports = router;
