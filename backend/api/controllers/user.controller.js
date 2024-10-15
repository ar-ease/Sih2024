import bcryptjs from "bcryptjs";

import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
export const test = (req, res) => {
  res.json({ message: "api is working" });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Not authorized... "));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password must be at least 6 characters long")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(
          400,
          "Username must be at least 3 and at most 20 characters long"
        )
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "Username must be alphanumeric"));
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...userDetails } = updatedUser._doc;
    res.status(200).json(userDetails);
  } catch (error) {
    next(errorHandler(500, "An error occurred while updating the user"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(401, "Not authorized... "));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {}
};

export const signout = (req, res) => {
  try {
    res.clearCookie("access_token").json({ message: "Signout successful" });
  } catch (error) {
    next(errorHandler(500, "An error occurred while signing out"));
  }
};
export const getUsers = async (req, res, next) => {
  // Check if user is admin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to view users"));
  }

  try {
    // Pagination and sorting
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9; // Corrected limit query
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    // Fetch users, excluding their passwords
    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...userDetails } = user._doc;
      return userDetails;
    });

    // Count total users
    const totalUsers = await User.countDocuments();

    // Count users updated in the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      updatedAt: { $gte: oneMonthAgo },
    });

    // Send response
    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    // Error handling
    next(errorHandler(500, error.message));
  }
};
