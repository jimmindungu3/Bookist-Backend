const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
    trim: true,
    required: [true, "Event title is required"],
    minlength: [5, "Title must be at least 5 characters long."],
    maxlength: [50, "Title cannot be more than 50 characters long"],
  },
  venue: {
    type: String,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
    trim: true,
    required: [true, "Venue is required"],
    minlength: [5, "Venue must be at least 5 characters long."],
    maxlength: [70, "Venue cannot be more than 50 characters long"],
  },
  capacity: {
    type: Number,
    min: [10, "Capacity cannot be less than 10"],
  },
  dateTime: {
    type: Date,
    required: [true, "Event date and time are required"],
  },
  charge: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  category: {
    type: [String],
    required: true,
    enum: [
      "Music",
      "Conference",
      "Workshop",
      "Sports",
      "Networking",
      "Theatre",
      "Exhibition",
    ],
    validate: {
      validator: function (v) {
        return v.length <= 4;
      },
      message: "An event can have a maximum of 3 categories.",
    },
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing"],
    default: "upcoming",
  },
});

module.exports = mongoose.model("Event", eventSchema);
