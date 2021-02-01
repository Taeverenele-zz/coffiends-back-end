const mongoose = require("mongoose");
const Cafe = require("../models/cafes.js");
const User = require("../models/users.js");
const Order = require("../models/orders.js");
const MenuItem = require("../models/menuItems.js");

const getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOneCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    res.status(200).json(cafe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getOneUserCafe = async (req, res) => {
  try {
    console.log(req.params.id)
    const cafe = await Cafe.findOne({ "owner": req.params.id });
    res.status(200).json(cafe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
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
  const { id } = req.params;
  const cafe = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No cafe with that id");
  }
  const updatedCafe = await Cafe.findByIdAndUpdate(id, cafe, { new: true });
  res.send(updatedCafe);
};

const updateCafeMenu = async (req, res) => {
  try {
    const cafe = await Cafe.updateOne(
      { _id: req.params.id },
      { menu: req.body.menu }
    );
    res.status(201).json(cafe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  };
};

const deleteCafe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No cafes with this id");
  await Cafe.findByIdAndRemove(id);
  res.json({ message: "Cafe deleted successfully" });
};

const getCafeOrders = async (req, res) => {
  try {
    const cafeOrders = await Order.find(
      {
        "cafe": req.params.id,
        "active": true
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(cafeOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getCafePastOrders = async (req, res) => {
  const pastDate = new Date(Date.now() - 604800000);
  try {
    const cafeOrders = await Order.find(
      {
        "cafe": req.params.id,
        "active": false,
        "order_date": { $gte: pastDate }
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(cafeOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getCafeMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find(
      {
        "cafe": req.params.id,
      }).populate("coffee");
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

module.exports = {
  getCafes,
  createCafe,
  getOneCafe,
  getOneUserCafe,
  deleteCafe,
  updateCafe,
  updateCafeMenu,
  getCafeOrders,
  getCafePastOrders,
  getCafeMenuItems
};
