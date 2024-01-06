import createError from "#utils/createError.js";
import { google } from "googleapis";
import authMain from "./authMain.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
];

export const googleAuth = (req, res, next) => {
    const result = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    });

    res.redirect(result);
};

const googleGetProfile = async (token) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
    });
    return await oauth2.userinfo.get();
};

export const googleAuthCallback = async (req, res, next) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    const profile = await googleGetProfile(tokens.access_token);
    if (!profile) throw createError(404, "Code not found");
    await authMain(
        {
            username: profile.data.name.split(" ")[0],
            email: profile.data.email || "",
            id: profile.data.id,
            img: profile.data.picture || "",
        },
        res,
        { name: "google" }
    );
};
