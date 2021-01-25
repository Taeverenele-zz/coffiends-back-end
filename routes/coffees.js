const express = require("express");
const {
  getCoffees,
  createCoffee,
  deleteCoffee,
} = require("../controllers/coffees.js");

const router = express.Router();

router.get("/", getCoffees);
router.post("/", createCoffee);
router.delete("/:id", deleteCoffee);

module.exports = router;
