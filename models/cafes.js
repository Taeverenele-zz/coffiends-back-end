const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  operating_hours: {
    type: Array,
    required: true,
  },
  menu: { type: mongoose.Types.ObjectId, ref: "Menu" },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Cafe = mongoose.model("Cafe", CafeSchema);

module.exports = Cafe;
