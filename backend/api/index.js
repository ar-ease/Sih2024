import postRoutes from "./routes/post.route.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import UserRoutes from "./routes/user.route.js";
import authroutes from "./routes/auth.route.js";
import commentroutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";

// import path from "path";

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB there");
});

// const __dirname = path.resolve();

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
console.log(process.env.PORT);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
  res.json("Server is ready sdd");
});

app.use("/api/user", UserRoutes);
app.use("/api/auth", authroutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentroutes);

// app.use("/uploads", express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
