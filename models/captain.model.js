const mongoose = require("mongoose");

const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, "Please enter first name"],
      minlength: [3, "First name must be at least 3 character long!"],
      trim: true,
      unique: false,
    },
    lastname: {
      type: String,
      minlength: [3, "First name must be at least 3 character long!"],
      trim: true,
      unique: false,
    },
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
      validator: function (value) {
        return emailRegexPattern.test(value);
      },
      message: "please enter a valid email",
    },
    unique: true,
    minlength: [5, "Email must be at least 5 character long!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: [true, "Please enter vehicle color"],
    },
    plate: {
      type: String,
      required: [true, "Please enter vehicle plate number"],
      unique: true,
      minlength: [3, "Plate number must be at least 3 characters long!"],
    },
    capacity: {
      type: Number,
      required: [true, "Please enter vehicle capacity"],
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: [true, "Please select vehicle type"],
    },
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Captain =
  mongoose.models.captain || mongoose.model("Captain", captainSchema);

module.exports = Captain;
