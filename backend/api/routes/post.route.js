import { getPosts } from "../controllers/post.controller.js";
import { create } from "../controllers/post.controller.js";
import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.post("/getposts", getPosts);

export default router;
