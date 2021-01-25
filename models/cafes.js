const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Cafe = mongoose.model("Cafe", CafeSchema);

module.exports = Cafe;
