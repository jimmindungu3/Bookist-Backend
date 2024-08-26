const express = require("express");
const { connectToDb } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const PORT = process.env.PORT || 3000
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use user routes
app.use(userRoutes);
app.use(eventRoutes);
app.use(bookingRouter);

// Connect to the database and start the server
connectToDb((err) => {
  if (!err) {
    app.listen(PORT);
  } else {
    console.error("Error connecting to database");
  }
});
