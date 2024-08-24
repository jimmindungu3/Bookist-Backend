const express = require("express");
const User = require("../models/userModel");
const userRouter = express.Router();

// Root handler
userRouter.get("/", (req, res) => {
  res.status(200).send("Home");
});

// POST a user
userRouter.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH a user
userRouter.patch("/api/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
userRouter.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

// DELETE single user by ID
userRouter.delete("/api/users/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST route to authenticate user
userRouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: `User with email ${props.email} not found `});
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    res.json({ message: "User authenticated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = userRouter;
