// db.js
const mongoose = require('mongoose');

module.exports = {
  connectToDb: (cb) => {
    mongoose.connect('mongodb://localhost:27017/bookist')
    .then(() => {
      console.log('Connected to MongoDB');
      cb();
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      cb(err);
    });
  }
};