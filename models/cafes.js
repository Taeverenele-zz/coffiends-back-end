const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema({
  cafe_name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50
  },
  address: {
    type: String,
    required: true,
    maxLength: 100
  },
  operating_hours: [
    {
      type: String,
      required: [ true, "Time must be in 24hr format: HHMM (e.g. 12am/midnight = 0000, 11:59pm = 2359)" ],
      minlength: 4,
      maxlength: 4
    }
  ],
  location: [
    {
      type: Number,
      required: true
    }
  ],
  menu: [
    {
      _id: false,
      coffeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee" },
      coffeeName: {
        type: String,
        required: true,
        maxLength: 25
      },
      coffeePrice: {
        type: Number,
        required: true,
        min: [ 0, "Coffee price must be more than $0.00"]
      }
    }
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Cafe = mongoose.model("Cafes", CafeSchema);

module.exports = Cafe;
