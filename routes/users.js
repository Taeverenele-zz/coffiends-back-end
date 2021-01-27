const express = require("express");
const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/users.js");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
