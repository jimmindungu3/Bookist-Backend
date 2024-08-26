const mongoose = require("mongoose");
require("dotenv").config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const URI = `mongodb+srv://${db_username}:${db_password}@bookist.udmm8.mongodb.net/?retryWrites=true&w=majority&appName=Bookist`;

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(URI)
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
