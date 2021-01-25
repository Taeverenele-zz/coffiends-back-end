const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  coffee: {
    type: [coffeeSchema],
    required: true,
  },
  cafe: {
    type: [cafeSchema],
    required: true,
  },
  user: {
    type: [userSchema],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
