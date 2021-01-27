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
<<<<<<< HEAD
  // operating_hours: {
  //   type: Array,
  //   required: true,
  // },
  // location: {
  //   type: Array,
  //   required: true,
  // },
  // menu: { type: mongoose.Types.ObjectId, ref: "Menu" },
  // owner: { type: mongoose.Types.ObjectId, ref: "User" },
=======
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
>>>>>>> d95131d09706220c705eae87fc721bf1a41d0f58
});

const Cafe = mongoose.model("Cafes", CafeSchema);

module.exports = Cafe;
