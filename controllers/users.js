const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/users.js");
const Order = require("../models/orders.js");
const Cafe = require("../models/cafes.js");

const registerUser = async (req, res) => {
  User.register(new User({
    username: req.body.username,
    user_name: req.body.user_name,
    role: req.body.role,
    phone: req.body.phone
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    };
    passport.authenticate("local")(req, res, () => {
      console.log("Registered successfully")
      res.send({ id: user._id, username: user.username, role: user.role, name: user.user_name });
    });
  });
};

const loginUser = (req, res, next) => {
  console.log("Login attempted");
  passport.authenticate("local",  { successRedirect: "/orders" }, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (!user) {
      res.status(400).send("Email/Password are incorrect");
    } else {
      req.logIn(user, (error) => {
          if (error) throw error;
          console.log("Logged in successfully")
          res.send({ id: user._id, username: user.username, role: user.role, name: user.user_name });
      });
    };
  })(req, res, next);
};

const userSessionCheck = (req, res) => {
  console.log("Checking if user is logged in...");
  if (req.user) {
      res.send({ id: req.user._id, username: req.user.username, role: req.user.role, name: req.user.user_name });
  } else {
      res.send(false);
  };
};

const logUserOut = (req, res) => {
  req.logOut();
  res.sendStatus(200);
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  };
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No cafe with that id");
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No cafes with this id");
  await User.findByIdAndRemove(id);
  res.json({ message: "User deleted successfully" });
};

const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find(
      {
        "user": req.params.id,
        "active": true
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

const getUserPastOrders = async (req, res) => {
  const pastDate = new Date(Date.now() - 604800000);
  try {
    const userOrders = await Order.find(
      {
        "user": req.params.id,
        "active": false,
        "order_date": { $gte: pastDate }
      }).populate({ path: 'cafe', model: Cafe }).populate("user");
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  };
};

module.exports = {
  registerUser,
  loginUser,
  userSessionCheck ,
  logUserOut,
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  getUserOrders,
  getUserPastOrders
};
