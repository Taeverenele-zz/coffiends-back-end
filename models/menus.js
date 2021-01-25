const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  coffee: {
    type: [coffeeSchema],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
