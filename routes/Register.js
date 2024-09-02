const express = require("express");
const User = require("../models/User");
const registerrouter = express.Router();

registerrouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    console.log(firstName, lastName, email, password, confirmPassword);
    const isExists = await User.findOne({ email: email });
    if (isExists) {
      return res.status(400).send("User already exists");
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
    await user.save();
    res.status(200).send(user._id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

registerrouter.post("/google/register", async (req, res) => {
  try {
    const { Name, email } = req.body;
    console.log(Name, email);
    const isExists = await User.findOne({ email: email });
    if (isExists) {
      return res.status(400).send("User already exists");
    }
    const user = new User({
      Name,
      email,
    });
    await user.save();
    res.status(200).send(user._id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = registerrouter;
