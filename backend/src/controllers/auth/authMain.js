import jwt from "jsonwebtoken";
import facebook from "#models/UserFB.js";
import google from "#models/UserGg.js";
import line from "#models/UserLine.js";
import email from "#models/User.js";

const refreshSecret = process.env.JWT_REFRESH_TOKEN;

export default async function authMain(user, res, db) {
    const DbUser = {
        facebook: facebook,
        google: google,
        line: line,
        email: email,
    }[db.name];
    
    const foundUser = await DbUser.findOneAndUpdate({ username: user.username },{ new: true });

    if (!foundUser) {
        const payload = {
            username: user.username,
            roles: 100,
        };
        const newRefreshToken = jwt.sign(payload, refreshSecret, {expiresIn: "1d"});

        const newUser = new DbUser({
            username: user.username,
            email: user.email || "",
            uid: user.id,
            db: db.name,
            img: user.img || "/img/default.png",
            expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
            refreshToken: newRefreshToken,
            roles: 100,
        });

        await newUser.save();

        res.cookie("jwt", "Bearer " + newRefreshToken, {
            httpOnly: true,
            secure: true,
            // sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.redirect(`${process.env.API_FRONTEND_URL}${db.name}?username=${newUser.username}&roles=${newUser.roles}&img=${newUser.img}&expires=${newUser.expires}`);
    } else {
        if (foundUser.expires < Date.now()) {
            const payload = {
                username: foundUser.username,
                roles: foundUser.roles,
            };

            const newRefreshToken = jwt.sign(payload, refreshSecret, {expiresIn: "1d"});

            foundUser.refreshToken = newRefreshToken;
            foundUser.expires = Date.now() + 24 * 60 * 60 * 1000;

            await foundUser.save();
        }

        res.cookie("jwt", "Bearer " + foundUser.refreshToken, {
            httpOnly: true,
            secure: true,
            // sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.redirect(`${process.env.API_FRONTEND_URL}${db.name}?username=${foundUser.username}&roles=${foundUser.roles}&img=${foundUser.img}&expires=${foundUser.expires}`);
    }
}
