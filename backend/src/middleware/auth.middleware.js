import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Getting the token from cookies
        const token = req.cookies.jwt;

        // If no token is found
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verifying the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If the token is not decoded correctly (e.g., expired or invalid)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Find the user by the ID stored in the decoded token
        const user = await User.findById(decoded._id).select("-password");

        // If the user is not found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the `req` object
        req.user = user;

        // Proceed to the next middleware/route handler
        next();

    } catch (error) {
        // Handle specific JWT errors (e.g., token expired)
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Unauthorized - Token Expired" });
        }

        // Log the error for debugging
        console.log("Error in protectRoute middleware:", error.message);

        // Generic error handling
        res.status(500).json({ message: "Internal server error" });
    }
};