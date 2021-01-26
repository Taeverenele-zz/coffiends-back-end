const mongoose = require("mongoose");
const Cafe = require("./cafes");
const Coffee = require("./coffees");

const OrderSchema = new mongoose.Schema({
  coffee: {
    type: { type: mongoose.Types.ObjectId, ref: "Coffee" },
    required: true,
  },
  cafe: {
    type: { type: mongoose.Types.ObjectId, ref: "Cafe" },
    required: true,
  },
  user: {
    type: { type: mongoose.Types.ObjectId, ref: "User" },
    required: true,
  },
  milk: {
    type: String,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

coffee.name;

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
