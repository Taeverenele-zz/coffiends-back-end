const express = require("express");
const { getCafes, createCafe, deleteCafe } = require("../controllers/cafes.js");

const router = express.Router();

router.get("/", getCafes);
router.post("/", createCafe);
router.delete("/:id", deleteCafe);

module.exports = router;
