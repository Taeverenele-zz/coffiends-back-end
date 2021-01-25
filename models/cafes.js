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
  menu: [menuSchema],
  owner: [userSchema],
});

const Cafe = mongoose.model("Cafe", CafeSchema);

module.exports = Cafe;
