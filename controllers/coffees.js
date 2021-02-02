const mongoose = require("mongoose");
const Coffee = require("../models/coffees.js");
const Cafe = require("../models/cafes.js");
const MenuItem = require("../models/menuItems.js");

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
const updateCoffee = async (req, res) => {
  const { id } = req.params;
  const coffee = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No coffee with that id");
  }
  const updatedCoffee = await Coffee.findByIdAndUpdate(id, coffee, { new: true });
  res.send(updatedCoffee);
};

const deleteCoffee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No coffees with this id");
  await Coffee.findByIdAndRemove(id);
  res.json({ message: "Coffee deleted successfully" });
};

const getAvailCafeCoffees = async (req, res) => {
  try {
    const availcoffees = req.body.coffees.filter(coff => !req.body.menu.includes(coff._id))
    res.status(200).json(availcoffees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getCoffees, createCoffee, updateCoffee, deleteCoffee, getAvailCafeCoffees };
