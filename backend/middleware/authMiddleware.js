import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect middleware allows us to protect routes for registered users
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the jwt from the cookie from the userController res.cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("You are not authorised to do that, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("You are not authorised to do that, you need a token.");
  }
});

// Admin middleware alows us to let admins functions work

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorised as an admin.");
  }
};

export { admin, protect };
