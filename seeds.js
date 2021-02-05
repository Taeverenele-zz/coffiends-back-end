const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/users.js");
const Cafe = require("./models/cafes.js");
const Coffee = require("./models/coffees.js");
const MenuItem = require("./models/menuItems.js");
const Order = require("./models/orders.js");

const CONNECTION_URL = process.env.MONGODB_URL;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
mongoose.connection.once("connected", async () => {
  mongoose.connection.db.dropDatabase();

  const flatWhite = await Coffee.create({
    name: "Flat White",
    description: "coffee & milk",
  });
  const espresso = await Coffee.create({
    name: "Espresso",
    description: "single/double shot of coffee",
  });
  const cappuccino = await Coffee.create({
    name: "cappuccino",
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

  const adminUser = await User.register(
    {
      username: "admin@coffiends.com",
      user_name: "Admin",
      role: "admin",
      phone: "0400000000",
    },
    "password"
  );
  const sebUser = await User.register(
    {
      username: "st.b.dev20@gmail.com",
      user_name: "Seb",
      role: "user",
      phone: "0400111222",
    },
    "password"
  );
  const neleUser = await User.register(
    {
      username: "ntaevere@gmail.com",
      user_name: "Nele",
      role: "user",
      phone: "0400111222",
    },
    "password"
  );
  const tyeUser = await User.register(
    {
      username: "cab022002@coderacademy.edu.au",
      user_name: "Tye",
      role: "user",
      phone: "0400111222",
    },
    "password"
  );

  const cafeTestUser = await User.register(
    {
      username: "cab022014@coderacademy.edu.au",
      user_name: "Test",
      role: "cafe",
      phone: "0400111222",
    },
    "password"
  );
  const testCafe = await Cafe.create({
    cafe_name: "Test Cafe",
    address: "L1 102 Adelaide St, Brisbane, QLD, 4000",
    operating_hours: ["0000", "2359"],
    location: [-27.468298, 153.0247838],
    owner: cafeTestUser._id,
    menu: [],
  });
  const testCafeMenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: testCafe._id,
  });
  const testCafeMenuItems2 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: testCafe._id,
  });
  const testMenu = [testCafeMenuItems1._id, testCafeMenuItems2._id];
  await Cafe.updateOne(
    { cafe_name: "Test Cafe" },
    { $push: { menu: testMenu } }
  );

  const user01 = await User.register(
    {
      username: "cafe01@coffiends.com",
      user_name: "cafe01",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe01 = await Cafe.create({
    cafe_name: "Brew Cafe & Wine Bar",
    address: "Lower, Burnett Ln, Brisbane City",
    operating_hours: ["0600", "1500"],
    location: [-27.4692878, 153.0253295],
    owner: user01._id,
    menu: [],
  });
  const cafe01MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe01._id,
  });
  const cafe01MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe01._id,
  });
  const cafe01MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe01._id,
  });
  const cafe01MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 3.5,
    cafe: cafe01._id,
  });
  const cafe01MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe01._id,
  });
  const cafe01MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4,
    cafe: cafe01._id,
  });
  const menu01 = [
    cafe01MenuItems1._id,
    cafe01MenuItems2._id,
    cafe01MenuItems3._id,
    cafe01MenuItems4._id,
    cafe01MenuItems5._id,
    cafe01MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Brew Cafe & Wine Bar" },
    { $push: { menu: menu01 } }
  );

  const user02 = await User.register(
    {
      username: "cafe02@coffiends.com",
      user_name: "cafe02",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe02 = await Cafe.create({
    cafe_name: "Cleberson’s Coffee . Cafe . Brisbane",
    address: "Shop 3, Stamford plaza hotel, 39 Edward St, Brisbane City",
    operating_hours: ["0700", "1500"],
    location: [-27.4713948, 153.0302251],
    owner: user02._id,
    menu: [],
  });
  const cafe02MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe02._id,
  });
  const cafe02MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe02._id,
  });
  const cafe02MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe02._id,
  });
  const cafe02MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 3.5,
    cafe: cafe02._id,
  });
  const cafe02MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe02._id,
  });
  const cafe02MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4,
    cafe: cafe02._id,
  });
  const menu02 = [
    cafe02MenuItems1._id,
    cafe02MenuItems2._id,
    cafe02MenuItems3._id,
    cafe02MenuItems4._id,
    cafe02MenuItems5._id,
    cafe02MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Cleberson’s Coffee . Cafe . Brisbane" },
    { $push: { menu: menu02 } }
  );

  const user03 = await User.register(
    {
      username: "cafe03@coffiends.com",
      user_name: "cafe03",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe03 = await Cafe.create({
    cafe_name: "3 Dragonflies Cafe",
    address: "214 Adelaide St, Brisbane City",
    operating_hours: ["0630", "1600"],
    location: [-27.467019, 153.0265688],
    owner: user03._id,
    menu: [],
  });
  const cafe03MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe03._id,
  });
  const cafe03MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe03._id,
  });
  const cafe03MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe03._id,
  });
  const cafe03MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 3.5,
    cafe: cafe03._id,
  });
  const cafe03MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe03._id,
  });
  const cafe03MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4,
    cafe: cafe03._id,
  });
  const menu03 = [
    cafe03MenuItems1._id,
    cafe03MenuItems2._id,
    cafe03MenuItems3._id,
    cafe03MenuItems4._id,
    cafe03MenuItems5._id,
    cafe03MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "3 Dragonflies Cafe" },
    { $push: { menu: menu03 } }
  );

  const user04 = await User.register(
    {
      username: "cafe04@coffiends.com",
      user_name: "cafe04",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe04 = await Cafe.create({
    cafe_name: "Cafe Mondial",
    address: "167 Albert St, Brisbane City",
    operating_hours: ["0530", "1400"],
    location: [-27.4704921, 153.0262486],
    owner: user04._id,
    menu: [],
  });
  const cafe04MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe04._id,
  });
  const cafe04MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe04._id,
  });
  const cafe04MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe04._id,
  });
  const cafe04MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 3.5,
    cafe: cafe04._id,
  });
  const cafe04MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe04._id,
  });
  const cafe04MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4,
    cafe: cafe04._id,
  });
  const menu04 = [
    cafe04MenuItems1._id,
    cafe04MenuItems2._id,
    cafe04MenuItems3._id,
    cafe04MenuItems4._id,
    cafe04MenuItems5._id,
    cafe04MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Cafe Mondial" },
    { $push: { menu: menu04 } }
  );

  const user05 = await User.register(
    {
      username: "cafe05@coffiends.com",
      user_name: "cafe05",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe05 = await Cafe.create({
    cafe_name: "Coffee Booth",
    address: "150 Edward St, Brisbane City",
    operating_hours: ["0400", "1200"],
    location: [-27.4696143, 153.0280019],
    owner: user05._id,
    menu: [],
  });
  const cafe05MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe05._id,
  });
  const cafe05MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe05._id,
  });
  const cafe05MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe05._id,
  });
  const cafe05MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 3.5,
    cafe: cafe05._id,
  });
  const cafe05MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe05._id,
  });
  const cafe05MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4,
    cafe: cafe05._id,
  });
  const menu05 = [
    cafe05MenuItems1._id,
    cafe05MenuItems2._id,
    cafe05MenuItems3._id,
    cafe05MenuItems4._id,
    cafe05MenuItems5._id,
    cafe05MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Coffee Booth" },
    { $push: { menu: menu05 } }
  );

  const user06 = await User.register(
    {
      username: "cafe06@coffiends.com",
      user_name: "cafe06",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe06 = await Cafe.create({
    cafe_name: "Anytime Coffee",
    address: "160 Mary St, Brisbane City",
    operating_hours: ["0500", "1700"],
    location: [-27.4707667, 153.0284625],
    owner: user06._id,
    menu: [],
  });
  const cafe06MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3,
    cafe: cafe06._id,
  });
  const cafe06MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.25,
    cafe: cafe06._id,
  });
  const cafe06MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.75,
    cafe: cafe06._id,
  });
  const cafe06MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 3.95,
    cafe: cafe06._id,
  });
  const cafe06MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3.3,
    cafe: cafe06._id,
  });
  const menu06 = [
    cafe06MenuItems1._id,
    cafe06MenuItems2._id,
    cafe06MenuItems3._id,
    cafe06MenuItems4._id,
    cafe06MenuItems5._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Anytime Coffee" },
    { $push: { menu: menu06 } }
  );

  const user07 = await User.register(
    {
      username: "cafe07@coffiends.com",
      user_name: "cafe07",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe07 = await Cafe.create({
    cafe_name: "Mallee Specialty Coffee",
    address: "Shop 11, Elizabeth Arcade, 97 Elizabeth St, Brisbane City",
    operating_hours: ["0900", "1700"],
    location: [-27.471151, 153.0255569],
    owner: user07._id,
    menu: [],
  });
  const cafe07MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 5,
    cafe: cafe07._id,
  });
  const cafe07MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 9,
    cafe: cafe07._id,
  });
  const cafe07MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 1.25,
    cafe: cafe07._id,
  });
  const cafe07MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 6.5,
    cafe: cafe07._id,
  });
  const cafe07MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 8.33,
    cafe: cafe07._id,
  });
  const cafe07MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 19.24,
    cafe: cafe07._id,
  });
  const menu07 = [
    cafe07MenuItems1._id,
    cafe07MenuItems2._id,
    cafe07MenuItems3._id,
    cafe07MenuItems4._id,
    cafe07MenuItems5._id,
    cafe07MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Mallee Specialty Coffee" },
    { $push: { menu: menu07 } }
  );

  const user08 = await User.register(
    {
      username: "cafe08@coffiends.com",
      user_name: "cafe08",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe08 = await Cafe.create({
    cafe_name: "Hard Coffee",
    address: "261 Queen St, Brisbane City",
    operating_hours: ["0900", "1700"],
    location: [-27.4678514, 153.0279357],
    owner: user08._id,
    menu: [],
  });
  const cafe08MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4,
    cafe: cafe08._id,
  });
  const cafe08MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 4.5,
    cafe: cafe08._id,
  });
  const cafe08MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 3,
    cafe: cafe08._id,
  });
  const cafe08MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4.25,
    cafe: cafe08._id,
  });
  const cafe08MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3.5,
    cafe: cafe08._id,
  });
  const cafe08MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 5.75,
    cafe: cafe08._id,
  });
  const menu08 = [
    cafe08MenuItems1._id,
    cafe08MenuItems2._id,
    cafe08MenuItems3._id,
    cafe08MenuItems4._id,
    cafe08MenuItems5._id,
    cafe08MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Hard Coffee" },
    { $push: { menu: menu08 } }
  );

  const user09 = await User.register(
    {
      username: "cafe09@coffiends.com",
      user_name: "cafe09",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe09 = await Cafe.create({
    cafe_name: "Wicked Corner Cafe",
    address: "2/166 Wickham Terrace, Spring Hill",
    operating_hours: ["0600", "1530"],
    location: [-27.4651175, 153.0247256],
    owner: user09._id,
    menu: [],
  });
  const cafe09MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4,
    cafe: cafe09._id,
  });
  const cafe09MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 4.5,
    cafe: cafe09._id,
  });
  const cafe09MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 3,
    cafe: cafe09._id,
  });
  const cafe09MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4.25,
    cafe: cafe09._id,
  });
  const cafe09MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3.5,
    cafe: cafe09._id,
  });
  const cafe09MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 5.75,
    cafe: cafe09._id,
  });
  const menu09 = [
    cafe09MenuItems1._id,
    cafe09MenuItems2._id,
    cafe09MenuItems3._id,
    cafe09MenuItems4._id,
    cafe09MenuItems5._id,
    cafe09MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Wicked Corner Cafe" },
    { $push: { menu: menu09 } }
  );

  const user10 = await User.register(
    {
      username: "cafe10@coffiends.com",
      user_name: "cafe10",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe10 = await Cafe.create({
    cafe_name: "Wake Up Coffee Brisbane",
    address: "Brisbane City",
    operating_hours: ["0600", "1530"],
    location: [-27.4705563, 153.0250769],
    owner: user10._id,
    menu: [],
  });
  const cafe10MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4,
    cafe: cafe10._id,
  });
  const cafe10MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 4.5,
    cafe: cafe10._id,
  });
  const cafe10MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 3,
    cafe: cafe10._id,
  });
  const cafe10MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4.25,
    cafe: cafe10._id,
  });
  const cafe10MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3.5,
    cafe: cafe10._id,
  });
  const cafe10MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 5.75,
    cafe: cafe10._id,
  });
  const menu10 = [
    cafe10MenuItems1._id,
    cafe10MenuItems2._id,
    cafe10MenuItems3._id,
    cafe10MenuItems4._id,
    cafe10MenuItems5._id,
    cafe10MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Wake Up Coffee Brisbane" },
    { $push: { menu: menu10 } }
  );

  const user11 = await User.register(
    {
      username: "cafe11@coffiends.com",
      user_name: "cafe11",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe11 = await Cafe.create({
    cafe_name: "Henry's Coffee Bar",
    address: "157 Ann St, Brisbane City",
    operating_hours: ["0600", "1430"],
    location: [-27.4674857, 153.0247736],
    owner: user11._id,
    menu: [],
  });
  const cafe11MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4,
    cafe: cafe11._id,
  });
  const cafe11MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 4.5,
    cafe: cafe11._id,
  });
  const cafe11MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 3,
    cafe: cafe11._id,
  });
  const cafe11MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4.25,
    cafe: cafe11._id,
  });
  const cafe11MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3.5,
    cafe: cafe11._id,
  });
  const cafe11MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 5.75,
    cafe: cafe11._id,
  });
  const menu11 = [
    cafe11MenuItems1._id,
    cafe11MenuItems2._id,
    cafe11MenuItems3._id,
    cafe11MenuItems4._id,
    cafe11MenuItems5._id,
    cafe11MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Henry's Coffee Bar" },
    { $push: { menu: menu11 } }
  );

  const user12 = await User.register(
    {
      username: "cafe12@coffiends.com",
      user_name: "cafe12",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe12 = await Cafe.create({
    cafe_name: "Cafe Pronto",
    address: "160 Ann St, Brisbane City",
    operating_hours: ["0630", "1730"],
    location: [-27.4674273, 153.0244211],
    owner: user12._id,
    menu: [],
  });
  const cafe12MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4,
    cafe: cafe12._id,
  });
  const cafe12MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 4.5,
    cafe: cafe12._id,
  });
  const cafe12MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 3,
    cafe: cafe12._id,
  });
  const cafe12MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4.25,
    cafe: cafe12._id,
  });
  const cafe12MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3.5,
    cafe: cafe12._id,
  });
  const cafe12MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 5.75,
    cafe: cafe12._id,
  });
  const menu12 = [
    cafe12MenuItems1._id,
    cafe12MenuItems2._id,
    cafe12MenuItems3._id,
    cafe12MenuItems4._id,
    cafe12MenuItems5._id,
    cafe12MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Cafe Pronto" },
    { $push: { menu: menu12 } }
  );

  const user13 = await User.register(
    {
      username: "cafe13@coffiends.com",
      user_name: "cafe13",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe13 = await Cafe.create({
    cafe_name: "Raw on Ann",
    address: "333 Ann St, Brisbane City",
    operating_hours: ["0830", "1430"],
    location: [-27.4649035, 153.0281946],
    owner: user13._id,
    menu: [],
  });
  const cafe13MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4.75,
    cafe: cafe13._id,
  });
  const cafe13MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 5.5,
    cafe: cafe13._id,
  });
  const cafe13MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 4,
    cafe: cafe13._id,
  });
  const cafe13MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 5.25,
    cafe: cafe13._id,
  });
  const cafe13MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 4.5,
    cafe: cafe13._id,
  });
  const cafe13MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 6.75,
    cafe: cafe13._id,
  });
  const menu13 = [
    cafe13MenuItems1._id,
    cafe13MenuItems2._id,
    cafe13MenuItems3._id,
    cafe13MenuItems4._id,
    cafe13MenuItems5._id,
    cafe13MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Raw on Ann" },
    { $push: { menu: menu13 } }
  );

  const user14 = await User.register(
    {
      username: "cafe14@coffiends.com",
      user_name: "cafe14",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe14 = await Cafe.create({
    cafe_name: "Coffee Mill",
    address: "1/225 Wickham Terrace, Spring Hill",
    operating_hours: ["0800", "1530"],
    location: [-27.4654762, 153.0232717],
    owner: user14._id,
    menu: [],
  });
  const cafe14MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4.75,
    cafe: cafe14._id,
  });
  const cafe14MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 5.5,
    cafe: cafe14._id,
  });
  const cafe14MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 4,
    cafe: cafe14._id,
  });
  const cafe14MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 5.25,
    cafe: cafe14._id,
  });
  const cafe14MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 4.5,
    cafe: cafe14._id,
  });
  const cafe14MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 6.75,
    cafe: cafe14._id,
  });
  const menu14 = [
    cafe14MenuItems1._id,
    cafe14MenuItems2._id,
    cafe14MenuItems3._id,
    cafe14MenuItems4._id,
    cafe14MenuItems5._id,
    cafe14MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Coffee Mill" },
    { $push: { menu: menu14 } }
  );

  const user15 = await User.register(
    {
      username: "cafe15@coffiends.com",
      user_name: "cafe15",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe15 = await Cafe.create({
    cafe_name: "The White Cat Coffee",
    address: "198 Adelaide St, Brisbane City",
    operating_hours: ["0700", "1600"],
    location: [-27.4670389, 153.0264034],
    owner: user15._id,
    menu: [],
  });
  const cafe15MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4.75,
    cafe: cafe15._id,
  });
  const cafe15MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 5.5,
    cafe: cafe15._id,
  });
  const cafe15MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 4,
    cafe: cafe15._id,
  });
  const cafe15MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 5.25,
    cafe: cafe15._id,
  });
  const cafe15MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 4.5,
    cafe: cafe15._id,
  });
  const cafe15MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 6.75,
    cafe: cafe15._id,
  });
  const menu15 = [
    cafe15MenuItems1._id,
    cafe15MenuItems2._id,
    cafe15MenuItems3._id,
    cafe15MenuItems4._id,
    cafe15MenuItems5._id,
    cafe15MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "The White Cat Coffee" },
    { $push: { menu: menu15 } }
  );

  const user16 = await User.register(
    {
      username: "cafe16@coffiends.com",
      user_name: "cafe16",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe16 = await Cafe.create({
    cafe_name: "The Coffee Club Café - Brisbane Supreme Courts",
    address: "415 George St, Brisbane City",
    operating_hours: ["0700", "1500"],
    location: [-27.4677314, 153.0213165],
    owner: user16._id,
    menu: [],
  });
  const cafe16MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 4.75,
    cafe: cafe16._id,
  });
  const cafe16MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 5.5,
    cafe: cafe16._id,
  });
  const cafe16MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 4,
    cafe: cafe16._id,
  });
  const cafe16MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 5.25,
    cafe: cafe16._id,
  });
  const cafe16MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 4.5,
    cafe: cafe16._id,
  });
  const cafe16MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 6.75,
    cafe: cafe16._id,
  });
  const menu16 = [
    cafe16MenuItems1._id,
    cafe16MenuItems2._id,
    cafe16MenuItems3._id,
    cafe16MenuItems4._id,
    cafe16MenuItems5._id,
    cafe16MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "The Coffee Club Café - Brisbane Supreme Courts" },
    { $push: { menu: menu16 } }
  );

  const user17 = await User.register(
    {
      username: "cafe17@coffiends.com",
      user_name: "cafe17",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe17 = await Cafe.create({
    cafe_name: "Bean Cafe",
    address: "Laneway Basement, 181 George St, Brisbane City",
    operating_hours: ["0600", "1530"],
    location: [-27.4713612, 153.0242376],
    owner: user17._id,
    menu: [],
  });
  const cafe17MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.3,
    cafe: cafe17._id,
  });
  const cafe17MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe17._id,
  });
  const cafe17MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2,
    cafe: cafe17._id,
  });
  const cafe17MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4,
    cafe: cafe17._id,
  });
  const cafe17MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 2.75,
    cafe: cafe17._id,
  });
  const cafe17MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4.5,
    cafe: cafe17._id,
  });
  const menu17 = [
    cafe17MenuItems1._id,
    cafe17MenuItems2._id,
    cafe17MenuItems3._id,
    cafe17MenuItems4._id,
    cafe17MenuItems5._id,
    cafe17MenuItems6._id,
  ];
  await Cafe.updateOne({ cafe_name: "Bean Cafe" }, { $push: { menu: menu17 } });

  const user18 = await User.register(
    {
      username: "cafe18@coffiends.com",
      user_name: "cafe18",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe18 = await Cafe.create({
    cafe_name: "Ricochet Espresso",
    address: "276 Edward St, Brisbane City",
    operating_hours: ["0800", "1600"],
    location: [-27.4674309, 153.0259044],
    owner: user18._id,
    menu: [],
  });
  const cafe18MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe18._id,
  });
  const cafe18MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe18._id,
  });
  const cafe18MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe18._id,
  });
  const cafe18MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4,
    cafe: cafe18._id,
  });
  const cafe18MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe18._id,
  });
  const cafe18MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4.5,
    cafe: cafe18._id,
  });
  const menu18 = [
    cafe18MenuItems1._id,
    cafe18MenuItems2._id,
    cafe18MenuItems3._id,
    cafe18MenuItems4._id,
    cafe18MenuItems5._id,
    cafe18MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Ricochet Espresso" },
    { $push: { menu: menu18 } }
  );

  const user19 = await User.register(
    {
      username: "cafe19@coffiends.com",
      user_name: "cafe19",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe19 = await Cafe.create({
    cafe_name: "Caffeine Kitchen",
    address: "400 Queen St, Brisbane City",
    operating_hours: ["0600", "1600"],
    location: [-27.4658384, 153.0299209],
    owner: user19._id,
    menu: [],
  });
  const cafe19MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe19._id,
  });
  const cafe19MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe19._id,
  });
  const cafe19MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe19._id,
  });
  const cafe19MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4,
    cafe: cafe19._id,
  });
  const cafe19MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe19._id,
  });
  const cafe19MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4.5,
    cafe: cafe19._id,
  });
  const menu19 = [
    cafe19MenuItems1._id,
    cafe19MenuItems2._id,
    cafe19MenuItems3._id,
    cafe19MenuItems4._id,
    cafe19MenuItems5._id,
    cafe19MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Caffeine Kitchen" },
    { $push: { menu: menu19 } }
  );

  const user20 = await User.register(
    {
      username: "cafe20@coffiends.com",
      user_name: "cafe20",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe20 = await Cafe.create({
    cafe_name: "Coffee Anthology",
    address: "126 Margaret St, Brisbane City",
    operating_hours: ["0800", "1800"],
    location: [-27.4729354, 153.0276392],
    owner: user20._id,
    menu: [],
  });
  const cafe20MenuItems1 = await MenuItem.create({
    coffee: flatWhite._id,
    price: 3.5,
    cafe: cafe20._id,
  });
  const cafe20MenuItems2 = await MenuItem.create({
    coffee: latte._id,
    price: 3.5,
    cafe: cafe20._id,
  });
  const cafe20MenuItems3 = await MenuItem.create({
    coffee: espresso._id,
    price: 2.5,
    cafe: cafe20._id,
  });
  const cafe20MenuItems4 = await MenuItem.create({
    coffee: cappuccino._id,
    price: 4,
    cafe: cafe20._id,
  });
  const cafe20MenuItems5 = await MenuItem.create({
    coffee: longBlack._id,
    price: 3,
    cafe: cafe20._id,
  });
  const cafe20MenuItems6 = await MenuItem.create({
    coffee: icedCoffee._id,
    price: 4.5,
    cafe: cafe20._id,
  });
  const menu20 = [
    cafe20MenuItems1._id,
    cafe20MenuItems2._id,
    cafe20MenuItems3._id,
    cafe20MenuItems4._id,
    cafe20MenuItems5._id,
    cafe20MenuItems6._id,
  ];
  await Cafe.updateOne(
    { cafe_name: "Coffee Anthology" },
    { $push: { menu: menu20 } }
  );

  await Order.create({
    cafe: testCafe,
    user: cafeTestUser,
    coffee: "Flat White",
    size: "Large",
    milk: "Regular Milk",
    sugar: 2,
    pickup_time: "10:30",
    total: 4,
  });
  await Order.create({
    cafe: testCafe,
    user: cafeTestUser,
    active: false,
    coffee: "Espresso",
    size: "Regular",
    milk: "No Milk",
    sugar: 0,
    pickup_time: "07:30",
    total: 2.5,
  });

  mongoose.connection.close();
});
