const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  cafe: { type: mongoose.Types.ObjectId, ref: "Cafe" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  order_date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  coffee: {
    type: String,
    required: true,
    maxLength: 25
  },
  size: {
    type: String,
    required: true,
    maxLength: 25
  },
  milk: {
    type: String,
    required: true,
    maxLength: 25
  },
  sugar: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  pickup_time: {
    type: String,
    required: [ true, "Time must be in 24hr format: HH:MM (e.g. 12am/midnight = 00:00, 11:59pm = 23:59)" ],
    minlength: 5,
    maxLength: 5
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
