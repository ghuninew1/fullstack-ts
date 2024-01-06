import User from "#models/User.js";
import bcrypt from "bcryptjs";
import createError from "#utils/createError.js";

export const handleRegister = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) throw createError(400, "Invalid Credentials");

    const user = await User.findOne({ username }).exec();

    if (user) throw createError(409, "User already exists");

    try {
        //encrypt the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            ...req.body,
            roles: 100,
            db: "email",
            img: "/img/default.png",
            expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
            password: hash,
        });
        await newUser.save();

        newUser.password = undefined;

        res.status(201).json({success: `New user ${newUser.username} created!`});
    } catch (err) {
        next(err);
    }
};

export default handleRegister;
