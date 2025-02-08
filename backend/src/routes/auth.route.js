import express from "express";
import { login, logout, signup, checkAuth, updateProfile } from "../controllers/auth.controller.js";  // <-- make sure `updateProfile` is imported
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// make sure `updateProfile` is correctly referenced here
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;