const mongoose = require("mongoose");

const objectId = mongoose.Types.ObjectId

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
  location: {
    type: Array,
    required: true
  },
  // menu: { type: mongoose.Types.ObjectId, ref: "Menu" },
  menu: {
    type: Array,
    default: [objectId]
  },
  owner: { type: objectId, ref: "User" },
});

const Cafe = mongoose.model("Cafes", CafeSchema);

module.exports = Cafe;
