const { validationResult } = require("express-validator");
const { createCaptain } = require("../services/captain.service");
const Captain = require("../models/captain.model");

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
