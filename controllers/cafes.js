const mongoose = require("mongoose");
const Cafe = require("../models/cafes.js");
const User = require("../models/users.js");
const Order = require("../models/orders.js");
const Coffee = require("../models/coffees.js");

const getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const createCafe = async (req, res) => {
  const cafe = req.body;
  const newCafe = new Cafe(cafe);
  try {
    await newCafe.save();
    res.status(201).json(newCafe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  };
};

const updateCafe = async (req, res) => {
  const { id } = req.params;
  const cafe = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No cafe with that id");
  };
  const updatedCafe = await Cafe.findByIdAndUpdate(id, cafe, { new: true });
  res.send(updatedCafe);
};

const deleteCafe = async (req, res) => {

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No cafes with this id");
  await Cafe.findByIdAndRemove(id);
  res.json({ message: "Cafe deleted successfully" });
};

const getCafeMenu = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    const menu = cafe.menu;
    const menuCoffeeIds = [];
    menu.map(item => menuCoffeeIds.push(String(item.coffeeId)));
    const allCoffees = await Coffee.find();
    const availcoffees = allCoffees.filter(coffee => !menuCoffeeIds.includes(String(coffee._id)));
    res.status(200).json({
      availCoffees: availcoffees,
      menu: menu
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const updateCafeMenu = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    const currentMenu = cafe.menu;
    let newMenu = [];
    if (req.body.type === "remove") {
     currentMenu.map(item => {
       if (item.coffeeId != req.body.item.coffeeId) {
         newMenu.push(item);
       };
     });
    } else if (req.body.type === "add") {
      const coffee = await Coffee.findById(req.body.item.coffee);
      const newItem = {
        coffeeId: coffee._id,
        coffeeName: coffee.name,
        coffeePrice: req.body.item.price
      };
      newMenu = currentMenu;
      newMenu.push(newItem);
    };
    cafe.menu = newMenu;
    await Cafe.findByIdAndUpdate(req.params.id, cafe, { new: true });
    res.sendStatus(201);
  } catch (error) {
    res.status(409).json({ message: error.message });
  };
};

const getCafeOrders = async (req, res) => {
  try {
    const cafeOrders = await Order.find(
      {
        "cafe": req.params.id,
        "active": true
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(cafeOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getCafePastOrders = async (req, res) => {
  const pastDate = new Date(Date.now() - 604800000);
  try {
    const cafeOrders = await Order.find(
      {
        "cafe": req.params.id,
        "active": false,
        "order_date": { $gte: pastDate }
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(cafeOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getOneUserCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findOne({ "owner": req.params.id });
    res.status(200).json(cafe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const selectMapCafes = async (req, res) => {
  const userGeo = req.body.location;
  const time = req.body.time;
  const coffee = req.body.coffee;
  
  try {
    const cafes = await Cafe.find(
      {
        "location.0": { $gte: (userGeo[0] - 0.0025), $lte: (userGeo[0] + 0.0025) },
        "location.1": { $gte: (userGeo[1] - 0.0025), $lte: (userGeo[1] + 0.0025) },
        "operating_hours.0": { $lte: time },
        "operating_hours.1": { $gte: time },
        "menu.coffeeName": coffee
      }
    );

    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

module.exports = {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  getCafeMenu,
  updateCafeMenu,
  getCafeOrders,
  getCafePastOrders,
  getOneUserCafe,
  selectMapCafes
};
