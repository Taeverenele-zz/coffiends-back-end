const mongoose = require("mongoose");
const Cafe = require("../models/cafes.js");
const MenuItems = require("../models/menuItems.js");

const selectMapCafes = async (req, res) => {
    const userGeo = [-27.468298, 153.0247838];
    const time = "0600"
    const coffee = "601223b1fdf36556350b602e"
    try {
      const cafes = await Cafe.find(
        {
          "location.0": { $gte: (userGeo[0] - 0.001), $lte: (userGeo[0] + 0.001) },
          "location.1": { $gte: (userGeo[1] - 0.001), $lte: (userGeo[1] + 0.001) },
          "operating_hours.0": { $lte: time },
          "operating_hours.1": { $gte: time },
        }
      ).populate("menu")
  
      const mapCafes = []
  
      cafes.map(cafe => {
        cafe.menu.map(item => {
          if (item.coffee == coffee) {
            mapCafes.push(cafe)
          }
        })
      })
        res.status(200).json(mapCafes);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

module.exports = { selectMapCafes };
