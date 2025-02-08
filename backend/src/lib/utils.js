import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({_id: userId}, process.env.JWT_SECRET, {  // Change {userId} to {_id: userId}
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevent XSS attacks
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // Secure cookies only in production
    });

    return token;
};
