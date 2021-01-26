const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  coffee: {
    type: {
      type: mongoose.Types.ObjectId,
      ref: "Coffee",
    },
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
