import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Here we create the jwt in a const called token. the secret will be imported from the .env file. The payload will contain the user id.
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
  // Set the jwt as a HTTP-only cookie. Also when we're not in development and in production then the http => https
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", //prevent attacks,
    maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days
  });
};

export default generateToken;
