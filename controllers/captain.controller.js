const { validationResult } = require("express-validator");
const { createCaptain } = require("../services/captain.service");
const Captain = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  if (!fullname || !email || !password || !vehicle) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const isCaptainExists = await Captain.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ message: "Captain already exists!" });
  }

  const hashedPassword = await Captain.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(404).json({ message: "Captain not found!" });
  }



  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }



  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: "Strict", // Adjust as needed
  });
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  // Clear the cookie
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logged out successfully!" });
};
