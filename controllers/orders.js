const mongoose = require("mongoose");
const Order = require("../models/orders.js");
const Cafe = require("../models/cafes.js");
const User = require("../models/users.js");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const createOrder = async (req, res) => {
  const order = req.body;
  const newOrder = new Order(order);
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  };
};

module.exports = { getOrders, createOrder };
