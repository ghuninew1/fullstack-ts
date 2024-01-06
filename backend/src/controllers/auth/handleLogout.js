import createError from "#utils/createError.js";

export const handleLogout = async (req, res, next) => {
    const cookies = req.cookies["jwt"] || req.cookies.jwt;
    if (cookies) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        res.sendStatus(200);
    } else {
        next(createError(401, "Unauthorized"));
    }
};

export default handleLogout;
