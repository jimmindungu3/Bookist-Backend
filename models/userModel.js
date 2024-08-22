const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: [6, "Full name must be at least 6 characters long."],
    maxlength: [30, "Full name cannot be more than 30 characters long"],
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  tel: {
    type: String,
    required: [true, "Mobile number is required"],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid mobile number. Phone number should be 10 digits long.`,
    },
  },
  // Add other fields as needed
});

module.exports = mongoose.model("User", userSchema);
