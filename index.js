const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json()); // middleware to parse JSON objects
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
  if (ObjectId.isValid(req.params.id)) {
    db.collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => res.status(204).json(result))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(404).json({ error: "Passed ID invalid" });
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
