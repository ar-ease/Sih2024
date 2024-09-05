import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log(confirmPassword);

  try {
    if (!username || !email || !password || !confirmPassword) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (password !== confirmPassword) {
      return next(errorHandler(400, "Passwords do not match"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...userDetails } = validUser._doc;
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(userDetails);
  } catch (error) {
    next(error);
  }
};
