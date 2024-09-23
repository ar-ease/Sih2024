import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  console.log("Cookies received:", req.cookies); // Check what cookies are received
  console.log("hii"); // Ensure this line logs

  const token = req.cookies.access_token;
  if (!token) {
    console.log("No token found"); // Log when no token is present
    return next(errorHandler(401, "Not authorized... "));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT verification failed:", err.message); // Log verification errors
      return next(errorHandler(401, "Not authorized... "));
    }

    console.log("JWT verified, user:", user); // Log the decoded user
    req.user = user;
    next();
  });
};
