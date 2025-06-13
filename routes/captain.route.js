const express = require("express");
const captainRouter = express.Router();

const { body } = require("express-validator");
const {
  register,
  login,
  getCaptainProfile,
  logoutCaptain,
} = require("../controllers/captain.controller");
const { authCaptain } = require("../middleware/auth.middleware");

captainRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be 3 character long!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long!"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long!"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate number must be at least 3 characters long!"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1!"),
    body("vehicle.type")
      .isIn(["car", "auto", "motorcycle"])
      .withMessage("Vehicle type must be either car, auto, or motorcycle!"),
  ],
  register
);

captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long!"),
  ],
  login
);

captainRouter.get("/profile", authCaptain, getCaptainProfile);

captainRouter.get("/logout", authCaptain, logoutCaptain);

module.exports = captainRouter;
