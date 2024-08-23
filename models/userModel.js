const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(), // Transform Name to Title Case
    trim: true, // remove leading and trailing white spaces. *** done before length checks are done ***
    required: [true, "Firstname is required"],
    minlength: [3, "First name must be at least 3 characters long."],
    maxlength: [10, "First name cannot be more than 10 characters long"],
  },
  lastName: {
    type: String,
    set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(), // Transform Name to Title Case
    trim: true,
    required: [true, "Lastname is required"],
    minlength: [3, "Last name must be at least 3 characters long."],
    maxlength: [10, "Last name cannot be more than 10 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  telNo: {
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
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long."],
    maxlength: [15, "Password cannot be more than 15 characters long"],
    required: [true, "Name is required"],
    trim: true,
  },
  // Add other fields as needed
});

module.exports = mongoose.model("User", userSchema);
