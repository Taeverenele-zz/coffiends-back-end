const mongoose = require("mongoose");

const objectId = mongoose.Types.ObjectId;

const CafeSchema = new mongoose.Schema({
  cafe_name: {
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
    required: true,
  },
<<<<<<< HEAD
  menu: {
    type: Array,
    default: [objectId],
  },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
=======
  // menu: {
  //   type: Array,
  //   default: [objectId]
  // },
  // owner: { type: mongoose.Types.ObjectId, ref: "User" },
>>>>>>> 48f66fa0244a0a83a5b2abe5d33c6d2c84ce86a0
});

const Cafe = mongoose.model("Cafes", CafeSchema);

module.exports = Cafe;
