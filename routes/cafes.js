const express = require("express");
const {
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
} = require("../controllers/cafes.js");

const router = express.Router();

router.get("/", getCafes);
router.post("/", createCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);
router.get("/:id/menu", getCafeMenu);
router.put("/:id/menu", updateCafeMenu);
router.get("/:id/orders", getCafeOrders);
router.get("/:id/orders/past", getCafePastOrders);
router.get("/user/:id", getOneUserCafe);
router.post("/map", selectMapCafes);

module.exports = router;
