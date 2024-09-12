const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.DB_URI;

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(DB_URI)
      .then(() => {
        console.log("Connected to MongoDB");
        cb();
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        cb(err);
      });
  },
};
