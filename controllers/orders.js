const mongoose = require("mongoose");
const Order = require("../models/orders.js");
const Cafe = require("../models/cafes.js");
const User = require("../models/users.js");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "active": true }).populate({ path: 'cafe', model: Cafe }).populate("user");
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

const getPastOrders = async (req, res) => {
  const pastDate = new Date(Date.now() - 604800000);
  try {
    const orders = await Order.find(
      {
        "active": false,
        "order_date": { $gte: pastDate }
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const setOrderComplete = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.active = false
  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(409).json({ message: error.message });
  };
};

module.exports = { getOrders, createOrder, getPastOrders, setOrderComplete };
