import createError from "#utils/createError.js";
import line from "#models/UserLine.js";
import facebook from "#models/UserFB.js";
import google from "#models/UserGg.js";
import email from "#models/User.js";
import { connectDBs } from "#models/index.js";

const { userDB } = connectDBs();

export const getUserDB = async (req, res, next) => {
    try {
        const { db } = req.params;
        if (!db) throw createError(401, "User Name Required");
        const userdb = await userDB.collection(db).find({}).toArray();
        return res.status(200).json(userdb);
    } catch (err) {
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const { db } = req.params;
        const { username } = req.user;

        if (!db) throw createError(401, "User Name Required");
        if (!username) throw createError(401, "User Name Required");
        const DbUser = {
            facebook: facebook,
            google: google,
            line: line,
            email: email,
        }[db];

        const dbUsers = await DbUser.findOne({ username }).select("-password");
        return res.status(200).json(dbUsers);
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    const { db } = req.params;
    const DbUser = {
        facebook: facebook,
        google: google,
        line: line,
        email: email,
    }[db];
    try {
        const dbUsers = await DbUser.find().select("-password");
        return res.status(200).json(dbUsers);
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email)
            throw createError(400, "Code not found");

        const dbUser = await User.create({
            username,
            password,
            email,
        });

        return dbUser
            ? res.status(200).json({ message: "User Created" })
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const getUserbyId = async (req, res, next) => {
    try {
        const { id, db } = req.params;
        if (!id) throw createError(401, "Id Required");
        const DbUser = {
            facebook: facebook,
            google: google,
            line: line,
            email: email,
        }[db];

        const dbUser = await DbUser.findOne({ _id: id }).select("-password");
        return res.status(200).json(dbUser);
    } catch (err) {
        next(err);
    }
};

export const updateUserbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw createError(401, "Id Required");

        const dbUser = await User.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        }).select("-password");
        return dbUser
            ? res.status(200).json({ message: "User Updated" })
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const deleteUserbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) throw createError(401, "Id Required");

        const dbUser = await User.findOneAndDelete({ _id: id }).select(
            "-password"
        );

        return dbUser
            ? res.status(200).json({ message: "User Deleted" })
            : next(createError(404, "No Users Found"));
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) throw createError(401, "Id Required");

        const dbUser = await User.findOneAndDelete({ _id: id }).select(
            "-password"
        );

        return res.status(200).json({
            status: 200,
            message: "User Deleted",
            confirmID: id,
        });
    } catch (err) {
        next(err);
    }
};
