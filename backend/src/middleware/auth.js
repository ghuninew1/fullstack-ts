import createError from "#utils/createError.js";
import jwt from "jsonwebtoken";

const refreshSecret = process.env.JWT_REFRESH_TOKEN;

export const authMid = (req, res, next) => {
    const token = req.headers["authorization"] || req.headers.Authorization;
    const accessToken = req.cookies["jwt"].split(" ")[1] || req.cookies?.jwt.split(" ")[1];

    if (accessToken || token) {
        try {
            jwt.verify(accessToken || token, refreshSecret, (err, decoded) => {
                if (err) throw createError(403, "Invalid Token");
                req.user = decoded;
                next();
            });
        } catch (err) {
            next(createError(401, "Unauthorized"));
        }
    } else {
        throw createError(403, "Access Denied. No token provided.");
    }
};
