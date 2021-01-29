const express = require("express");
const {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  registerUser,
  loginUser,
  logUserOut,
  userSessionCheck,
} = require("../controllers/users.js");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logUserOut);
router.get("/check", userSessionCheck);

module.exports = router;
