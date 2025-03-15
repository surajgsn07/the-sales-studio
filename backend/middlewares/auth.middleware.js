
import jwt, { decode } from "jsonwebtoken";
const User = require("../models/user.js");

export const verifyJwt = (async( req , res, next)=>{
    try {
        
        const token =  req.header("Authorization")?.replace("Bearer " , "") || req.body.token || req.body.headers?.Authorization?.replace("Bearer " , "") || req.cookies.accessToken ;

        
        if(!token){
            throw new ApiError(401, "Unauthorized request");
        }

        
    
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select("-password");

        if(!user){
            throw new Error(401, "Invalid token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new Error(401, error?.message || "Invalid access token");
    }

})