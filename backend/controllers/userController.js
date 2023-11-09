import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// This authenticates the user and gets the token and logs in
// route: POST /api/users/login
// access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // generateToken is an imported function we made that processes the jwt content
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// This registers the user
// route: POST /api/users
// access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id); // DRY
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("You have entered invalid user data");
  }
});

// This logs out the user and clears cookie
// route: POST /api/users/logout
// access: Private
const logoutUser = asyncHandler(async (req, res) => {
  // Here we clear the cookie (reset it to an empty string) which effectively logs the user out
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully." });
});

// This gets user profile
// route: GET /api/users/profile
// access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// This updates user profile
// route: PUT /api/users/profile
// access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Can only update these two fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Password is hashed so it is handled seperately
    if (req.body.password) {
      user.password = req.body.password;
    }

    // This saves the updated version to the user
    const updatedUser = await user.save();

    // This responds with the updated version
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// This gets all users
// route: GET /api/users
// access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// This gets a single user by ID
// route: GET /api/users/:id
// access: Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// This deletes users
// route: DELETE /api/users/:id
// access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user profile");
});

// Admin updates any user
// route: PUT /api/users/:id
// access: Private/Admin
const userUpdate = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  userUpdate,
};
