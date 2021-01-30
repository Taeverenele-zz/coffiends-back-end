const mongoose = require("mongoose");
const MenuItem = require("../models/menuItems.js");
const Cafe = require("../models/cafes.js");
const Coffee = require("../models/coffees.js");

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOneMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const createMenuItem = async (req, res) => {
  const menuItem = req.body;
  const newMenuItem = new MenuItem(menuItem);
  try {
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Menu Items with this id");
  await MenuItem.findByIdAndRemove(id);
  res.json({ message: "Menu Item deleted successfully" });
};

module.exports = { getMenuItems, createMenuItem, getOneMenuItem, deleteMenuItem };
