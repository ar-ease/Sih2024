import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log(confirmPassword);

  try {
    // Check if all required fields are present and not empty
    if (!username || !email || !password || !confirmPassword) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return next(errorHandler(400, "Passwords do not match"));
    }

    // Hash the password asynchronously
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error); // Pass any errors to the error-handling middleware
  }
};
