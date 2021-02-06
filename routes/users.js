const express = require("express");
const {
  registerUser,
  loginUser,
  userSessionCheck,
  logUserOut,
  getOneUser,
  deleteUser,
  updateUser,
  changeUserPassword,
  getUserOrders,
  getUserPastOrders,
} = require("../controllers/users.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check", userSessionCheck);
router.get("/logout", logUserOut);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
router.patch("/:id/change_password", changeUserPassword);
router.get("/:id/orders", getUserOrders);
router.get("/:id/orders/past", getUserPastOrders);

module.exports = router;
