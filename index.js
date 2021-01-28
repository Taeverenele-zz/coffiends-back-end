require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const CONNECTION_URL =
  "mongodb+srv://ntaevere:ntaevere123@coffee.nip9p.mongodb.net/coffiends?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/coffees", require("./routes/coffees.js"));
app.use("/cafes", require("./routes/cafes.js"));
app.use("/users", require("./routes/users.js"));
app.use("/map", require("./routes/map.js"));
app.use("/orders", require("./routes/orders.js"));

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
