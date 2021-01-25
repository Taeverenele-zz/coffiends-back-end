import mongoose from "mongoose";

const CoffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Coffee = mongoose.model("Coffee", CoffeeSchema);

export default Coffee;
