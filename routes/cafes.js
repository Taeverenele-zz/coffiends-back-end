const express = require("express");
const {
  getCafes,
  createCafe,
  deleteCafe,
  updateCafe,
} = require("../controllers/cafes.js");

const router = express.Router();

router.get("/", getCafes);
router.post("/", createCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);

module.exports = router;
