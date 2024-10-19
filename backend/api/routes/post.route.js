import { deletePost, updatePost } from "../controllers/post.controller.js";
import { getPosts } from "../controllers/post.controller.js";
import { create } from "../controllers/post.controller.js";
import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
router.put("/updatepost/:postId/:userId", verifyToken, updatePost);
export default router;
