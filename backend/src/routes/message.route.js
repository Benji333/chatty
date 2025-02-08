import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";  // Importing getMessages

const router = express.Router();

// Routes
router.get("/users", protectRoute, getUsersForSidebar);  // Route for fetching users for sidebar
router.get("/:id", protectRoute, getMessages);  // Route for fetching messages by id
router.post("/send/:id", protectRoute, sendMessage);  // Route for sending a message

export default router;