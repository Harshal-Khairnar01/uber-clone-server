const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const Captain = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token});

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
}
