const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/users.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
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

const registerUser = async (req, res) => {
  User.register(new User({
    username: req.body.username,
    user_name: req.body.user_name,
    role: req.body.role,
    phone: req.body.phone
  }), req.body.password, function(err, user) {
    if (err) {
      res.status(400).send(err);
    };
    passport.authenticate("local")(req, res, () => {
      res.send({ username: user.username });
    });
  });
};

const loginUser = async (req, res) => {
  console.log("Trying to login");
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.log(err)
      res.status(400).send(err);
    };
    if (!user) {
      res.status(400).send("Email/Password are incorrect");
    } else {
      req.logIn(user, (error) => {
          if (error) throw error;
          res.send({username: user.username, id: user._id });
      });
    };
  })(req, res);
};

const logUserOut = (req, res) => {
  req.logOut();
  res.send(200);
};

const userSessionCheck = async (req, res) => {
  console.log("checking");
  if (req.user) {
      res.send({username: req.user.username});
  } else {
      res.send({username: null});
  };
};

module.exports = { getUsers, getOneUser, createUser, deleteUser, updateUser, registerUser, loginUser, logUserOut, userSessionCheck };
