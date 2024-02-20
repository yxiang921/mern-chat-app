import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/sendMessage/:id",protectRoute, sendMessage);
router.get("/getMessage/:id",protectRoute, getMessage);

export default router;