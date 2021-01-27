const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  coffee: { type: mongoose.Types.ObjectId, ref: "Coffee" },
  price: {
    type: Number,
    required: true,
  },
  cafe: { type: mongoose.Types.ObjectId, ref: "Cafe" },
});


const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

module.exports = MenuItem;
