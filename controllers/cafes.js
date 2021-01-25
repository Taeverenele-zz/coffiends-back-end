const mongoose = require("mongoose");
const Cafe = require("../models/cafes.js");

const getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createCafe = async (req, res) => {
  const cafe = req.body;
  const newCafe = new Cafe(cafe);
  try {
    await newCafe.save();
    res.status(201).json(newCafe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateCafe = async (req, res) => {
  const { id: _id } = req.params;
  const cafe = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No cafe with that id");
  const updatedCafe = await Cafe.findByIdAndUpdate(_id, cafe, { new: true });
  res.json(updatedCafe);
};

const deleteCafe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No cafes with this id");
  await Cafe.findByIdAndRemove(id);
  res.json({ message: "Cafe deleted successfully" });
};

module.exports = { getCafes, createCafe, deleteCafe, updateCafe };
