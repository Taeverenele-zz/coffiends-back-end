const mongoose = require("mongoose");
const Coffee = require("../models/coffees.js");

const getCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.find();
    res.status(200).json(coffees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createCoffee = async (req, res) => {
  const coffee = req.body;
  const newCoffee = new Coffee(coffee);
  try {
    await newCoffee.save();
    res.status(201).json(newCoffee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteCoffee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No coffees with this id");
  await Coffee.findByIdAndRemove(id);
  res.json({ message: "Coffee deleted successfully" });
};

module.exports = { getCoffees, createCoffee, deleteCoffee };
