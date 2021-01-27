const mongoose = require("mongoose");
const User = require("./models/users.js");
const Cafe = require("./models/cafes.js");
const Coffee = require("./models/coffees.js");
const MenuItem = require("./models/menuItems.js");

const CONNECTION_URL =
  "mongodb+srv://ntaevere:ntaevere123@coffee.nip9p.mongodb.net/coffiends?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
mongoose.connection.once("connected", async () => {
  mongoose.connection.db.dropDatabase();

  const user1 = await User.create({
    user_name: "Seb",
    email: "st.b.dev20@gmail.com",
    password: "password",
    role: "user",
    phone: "0400111222",
  });

  const cafe1 = await Cafe.create({
    cafe_name: "Seb's Cafe",
    address: "L1 120 Adelaide St, Brisbane, 4000",
    operating_hours: ["0500", "1700"],
    location: [-27.468298, 153.0247838],
    owner: user1._id,
    menu: [],
  });

  const flatWhite = await Coffee.create({
    name: "Flat White",
    description: "coffee & milk",
  });
  const espresso = await Coffee.create({
    name: "Espresso",
    description: "single/double shot of coffee",
  });
  const capuccino = await Coffee.create({
    name: "Capuccino",
    description: "frothy milked coffee with a dash of chocolate sprinkles",
  });
  const latte = await Coffee.create({
    name: "Latte",
    description: "milky coffee",
  });
  const longBlack = await Coffee.create({
    name: "Long Black",
    description: "large black coffee",
  });
  const icedCoffee = await Coffee.create({
    name: "Iced Coffee",
    description: "like a latte but cold with ice n stuff",
  });

  const menuItems1 = await MenuItem.create({
    type: flatWhite._id,
    price: 3.5,
    cafe: cafe1._id,
  });
  const menuItems2 = await MenuItem.create({
    type: latte._id,
    price: 3.5,
    cafe: cafe1._id,
  });
  const menuItems3 = await MenuItem.create({
    type: espresso._id,
    price: 2.5,
    cafe: cafe1._id,
  });
  const menuItems4 = await MenuItem.create({
    type: capuccino._id,
    price: 3.5,
    cafe: cafe1._id,
  });
  const menuItems5 = await MenuItem.create({
    type: longBlack._id,
    price: 3,
    cafe: cafe1._id,
  });
  const menuItems6 = await MenuItem.create({
    type: icedCoffee._id,
    price: 4,
    cafe: cafe1._id,
  });

  const menu1 = [
    menuItems1._id,
    menuItems2._id,
    menuItems3._id,
    menuItems4._id,
    menuItems5._id,
    menuItems6._id,
  ];

  await Cafe.updateOne(
    { cafe_name: "Seb's Cafe" },
    { $push: { menu: menu1 } },
    console.log("yay")
  );

  mongoose.connection.close();
});
