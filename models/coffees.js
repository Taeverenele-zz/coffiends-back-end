const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 25
  },
  description: {
    type: String,
    required: true,
    maxLength: 100
  }
});

const Coffee = mongoose.model("Coffee", CoffeeSchema);

module.exports = Coffee;
