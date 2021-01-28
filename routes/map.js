const express = require("express");
const {
  selectMapCafes,
} = require("../controllers/map.js");

const router = express.Router();

router.get("/", selectMapCafes);

module.exports = router;
