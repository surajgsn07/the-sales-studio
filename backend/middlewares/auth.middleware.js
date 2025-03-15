const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyJwt = async (req, res, next) => {
    try {
        const token =
            req.header("Authorization")?.replace("Bearer ", "") ||
            req.body.token ||
            req.headers?.authorization?.replace("Bearer ", "") ||
            req.cookies?.accessToken;



        if (!token) {
            return res.status(401).json({ message: "Unauthorized request. No token provided." });
        }

        // Verify JWT
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch user
        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid access token." });
    }
};

module.exports = { verifyJwt };
