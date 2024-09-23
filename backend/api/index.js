import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import UserRoutes from "./routes/user.route.js";
import authroutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

// console.log("hello", process.env.HELLO);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB there");
});

app.get("/", (req, res) => {
  res.json("Server is ready sdd");
});

app.get("/api/data", (req, res) => {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "a@gmail.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "b@gmail.com",
    },
    {
      id: 3,
      name: "Jim Doe",
      email: "c@gmail.com",
    },
  ];

  res.json(dummyData);
});

app.use("/api/user", UserRoutes);
app.use("/api/auth", authroutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
const port = process.env.PORT || 4000;
console.log(process.env.PORT);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
