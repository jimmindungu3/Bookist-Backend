const express = require("express");
const { connectToDb } = require("../config/db");
const User = require("../models/userModel");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Root handler
app.get("/", (req, res) => {
  res.status(200).send("Home");
});

// POST a user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH a user
app.patch("/api/users/:id", async (req, res) => {
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
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

// DELETE single user by ID
app.delete("/api/users/:id", async (req, res) => {
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

// Connect to the db, then start up the server
connectToDb((err) => {
  if (!err) {
    app.listen(3000);
  } else {
    console.error("Error connecting to database");
  }
});
