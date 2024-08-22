const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId, Collection } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json()); // middleware to parse JSON objects
app.use(cors());
let db;

// Root handler
app.get("/", (req, res) => {
  res.status(200).send("Home");
});

// POST a user
app.post("/api/users", (req, res) => {
  db.collection("users")
    .insertOne(req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => res.status(500).send(err));
});

// PATCH a user
app.patch("/api/users/:id", (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .updateOne(
        { _id: new ObjectId(req.params.id) }, // Filter: which document to update
        { $set: req.body } // Update: the fields to change
      )
      .then((result) => {
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
      })
      .catch((err) => res.status(500).json({ error: "Internal server error" }));
  } else {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

// Get all users
app.get("/api/users", (req, res) => {
  let users = [];
  db.collection("users")
    .find()
    .forEach((user) => users.push(user))
    .then(() => res.status(200).json(users))
    .catch(() => res.status(500).json({ error: "Could not fetch products" }));
});

// DELETE single user by ID
app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  if (ObjectId.isValid(userId)) {
    db.collection("users")
      .deleteOne({ _id: new ObjectId(userId) })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "User not found" });
        } else {
          res.sendStatus(204); // status 204 does not allow for a response message
        }
      })
      .catch((err) => res.status(500).json({ error: "Internal server error" }));
  } else {
    res.status(400).json({ error: "Invalid user ID" });
  }
});

// Check if we can connect to the db, then start up the server
connectToDb((err) => {
  if (!err) {
    // Since we can connect to db, we start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
      db = getDb();
    });
  } else {
    console.error("Error connecting to database");
  }
});
