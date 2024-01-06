import User from "#models/User.js";
import bcrypt from "bcryptjs";
import createError from "#utils/createError.js";
import jwt from "jsonwebtoken";

// const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_TOKEN;

export const handleLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw createError(400, "Please enter all fields");

        const foundUser = await User.findOne({ username });
        if (!foundUser) throw createError(400, "User does not exist");

        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            if (foundUser.expires < Date.now()) {
                const payload = {
                    username: username,
                    roles: foundUser.roles,
                };

                const expiresIn = 24 * 60 * 60 * 1000; // 1 day
                const newRefreshToken = jwt.sign(payload, refreshSecret, {
                    expiresIn: "1d",
                });

                foundUser.refreshToken = newRefreshToken;
                foundUser.expires = Date.now() + expiresIn;
                await foundUser.save();
            }

            res.cookie("jwt", "Bearer " + foundUser.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 24 * 60 * 60 * 1000, // 1 day,
            });
            res.status(200).json({
                username: foundUser.username,
                roles: foundUser.roles,
                expires: foundUser.expires,
                img: foundUser.img,
            });
        } else throw createError(400, "Invalid Credentials");
    } catch (err) {
        next(err);
    }
};

export default handleLogin;
