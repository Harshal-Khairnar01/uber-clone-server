const express = require("express");
const userRouter = express.Router();

const { body } = require("express-validator");
const {
  register,
  login,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller");
const { authUser } = require("../middleware/auth.middleware");

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name must be 3 character long!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long!"),
  ],
  register
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long!"),
  ],
  login
);

userRouter.get("/profile", authUser, getUserProfile);

userRouter.get("/logout", authUser, logoutUser);

module.exports = userRouter;
