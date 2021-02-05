const express = require("express");
const {
  getCafes,
  createCafe,
  getOneCafe,
  getOneUserCafe,
  deleteCafe,
  updateCafe,
  updateCafeMenu,
  getCafeOrders,
  getCafePastOrders,
  getCafeMenuItems,
  selectMapCafes
} = require("../controllers/cafes.js");

const router = express.Router();

router.get("/", getCafes);
router.post("/", createCafe);
router.get("/:id", getOneCafe);
router.get("/user/:id", getOneUserCafe);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);
router.get("/:id/orders", getCafeOrders);
router.get("/:id/orders/past", getCafePastOrders);
router.get("/:id/menu", getCafeMenuItems);
router.put("/:id/menu", updateCafeMenu);
router.post("/map", selectMapCafes);

module.exports = router;
