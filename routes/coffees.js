const express = require("express");
const {
  getCoffees,
  createCoffee,
  updateCoffee,
  deleteCoffee,
  getAvailCafeCoffees
} = require("../controllers/coffees.js");

const router = express.Router();

router.get("/", getCoffees);
router.post("/", createCoffee);
router.put("/:id", updateCoffee);
router.delete("/:id", deleteCoffee);
router.post("/available", getAvailCafeCoffees);

module.exports = router;
