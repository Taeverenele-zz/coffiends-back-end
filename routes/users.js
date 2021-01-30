const express = require("express");
const {
  registerUser,
  loginUser,
  userSessionCheck,
  logUserOut,
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  getUserOrders,
  getUserPastOrders
} = require("../controllers/users.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check", userSessionCheck);
router.get("/logout", logUserOut);
router.get("/", getUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/orders", getUserOrders);
router.get("/:id/orders/past", getUserPastOrders);

module.exports = router;
