const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema({
  cafe_name: {
    type: String,
    required: true,
    unique: true
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
  menu: [
    {
      _id: false,
      coffeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee" },
      coffeeName: {
        type: String,
        required: true
      },
      coffeePrice: {
        type: Number,
        required: true
      }
    }
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Cafe = mongoose.model("Cafes", CafeSchema);

module.exports = Cafe;
