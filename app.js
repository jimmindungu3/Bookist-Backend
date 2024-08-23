const express = require("express");
const { connectToDb } = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use user routes
app.use(userRoutes);
app.use(eventRoutes);

// Connect to the database and start the server
connectToDb((err) => {
  if (!err) {
    app.listen(3000);
  } else {
    console.error("Error connecting to database");
  }
});
