import { signin, signup } from "../controllers/auth.controller.js";
import { google } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
