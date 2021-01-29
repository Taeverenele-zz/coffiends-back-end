const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  cafe: { type: mongoose.Types.ObjectId, ref: "Cafe" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  order_date: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true
  },
  coffee: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true
  },
  milk: {
    type: String,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  pickup_time: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
