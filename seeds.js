const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/users.js");
const Cafe = require("./models/cafes.js");
const Coffee = require("./models/coffees.js");
const Order = require("./models/orders.js");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
mongoose.connection.once("connected", async () => {
  mongoose.connection.db.dropDatabase();

  const espresso = await Coffee.create({
    name: "Espresso",
    description: "Near boiling water forced through ground coffee beans under pressure",
  });
  const flatWhite = await Coffee.create({
    name: "Flat White",
    description: "An espresso with microfoam (steamed milk)",
  });
  const cappuccino = await Coffee.create({
    name: "Cappuccino",
    description: "An espresso with steamed milk foam & finished witha  fine coat of chocolate powder",
  });
  const latte = await Coffee.create({
    name: "Latte",
    description: "An espresso with steamed milk - more milk than a flat white",
  });
  const longBlack = await Coffee.create({
    name: "Long Black",
    description: "A double-shot espresso poured over hot water",
  });
  const icedCoffee = await Coffee.create({
    name: "Iced Coffee",
    description: "An espresso poured over ice and cold milk",
  });

  const adminUser = await User.register(
    {
      username: "admin@coffiends.com",
      user_name: "Admin",
      role: "admin",
      phone: "0412356789",
    },
    "password"
  );

  const testUser = await User.register(
    {
      username: "user@coffiends.com",
      user_name: "Test User",
      role: "user",
      phone: "0412356789",
    },
    "password"
  );

  const cafeUser = await User.register(
    {
      username: "cafe@coffiends.com",
      user_name: "Cafe User",
      role: "cafe",
      phone: "0412356789",
    },
    "password"
  );
  const testCafe = await Cafe.create({
    cafe_name: "The Testing Cafe",
    address: "L1 102 Adelaide St, Brisbane, QLD, 4000",
    operating_hours: ["0000", "2359"],
    location: [-27.468298, 153.0247838],
    owner: cafeUser._id,
    menu: [],
  });
  await Cafe.findByIdAndUpdate(testCafe._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      }
    ] } },
    { new: true }
  );
  await Order.create({
    cafe: testCafe,
    user: cafeUser,
    coffee: "Flat White",
    size: "Large",
    milk: "Soy Milk",
    sugar: 2,
    pickup_time: "10:30",
    total: 4,
  });
  await Order.create({
    cafe: testCafe,
    user: cafeUser,
    active: false,
    coffee: "Espresso",
    size: "Regular",
    milk: "Regular",
    sugar: 0,
    pickup_time: "07:00",
    total: 2.5,
  });

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
  await Cafe.findByIdAndUpdate(cafe01._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe02._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe03._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.75
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 4
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4.25
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.3
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5.5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe04._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe05._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.2
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.8
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 4.1
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4.65
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.45
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 7.89
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe06._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 50
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe07._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe08._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.1
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 3.2
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 2.4
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 4
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe09._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe10._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.85
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.3
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.9
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4.5
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.6
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 66
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe11._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.9
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 4
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 4.25
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4.5
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 7.5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe12._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe13._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe14._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe15._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 3.3
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 4.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 5
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 5.25
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 4
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 8
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe16._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe17._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
  );

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
  await Cafe.findByIdAndUpdate(cafe18._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe19._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
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
  await Cafe.findByIdAndUpdate(cafe20._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
  );

  const user21 = await User.register(
    {
      username: "cafe21@coffiends.com",
      user_name: "cafe21",
      role: "cafe",
      phone: "0400000000",
    },
    "password"
  );
  const cafe21 = await Cafe.create({
    cafe_name: "Big Pig Cafe",
    address: "126 Radford Rd, Manly West",
    operating_hours: ["0000", "2359"],
    location: [-27.4682531,153.1615131],
    owner: user21._id,
    menu: [],
  });
  await Cafe.findByIdAndUpdate(cafe21._id,
    { $push: { menu: [
      {
        coffeeId: espresso._id,
        coffeeName: espresso.name,
        coffeePrice: 2.5
      },
      {
        coffeeId: flatWhite._id,
        coffeeName: flatWhite.name,
        coffeePrice: 3.5
      },
      {
        coffeeId: cappuccino._id,
        coffeeName: cappuccino.name,
        coffeePrice: 3.75
      },
      {
        coffeeId: latte._id,
        coffeeName: latte.name,
        coffeePrice: 4
      },
      {
        coffeeId: longBlack._id,
        coffeeName: longBlack.name,
        coffeePrice: 3.25
      },
      {
        coffeeId: icedCoffee._id,
        coffeeName: icedCoffee.name,
        coffeePrice: 5
      }
    ] } },
    { new: true }
  );

  mongoose.connection.close();
});
