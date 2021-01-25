const mongoose = require("mongoose");
const Cafe = require("../models/cafes.js");

const getCafes = async (req, res) => {
  // try {
  //   const coffees = await Coffee.find();
  //   res.status(200).json(coffees);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

const createCafe = async (req, res) => {
  // const coffee = req.body;
  // const newCoffee = new Coffee(coffee);
  // try {
  //   await newCoffee.save();
  //   res.status(201).json(newCoffee);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

const deleteCafe = async (req, res) => {
  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return res.status(404).send("No coffees with this id");
  // await Coffee.findByIdAndRemove(id);
  // res.json({ message: "Post deleted successfully" });
};

module.exports = { getCafes, createCafe, deleteCafe };
