import createError from "#utils/createError.js";
import axios from "axios";
import authMain from "./authMain.js";

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;

export const facebookAuth = (req, res, next) => {
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_CALLBACK_URL}&state=123456789&scope=email`;
    res.redirect(authUrl);
};

export const facebookCallback = async (req, res, next) => {
    const { code } = req.query;

    if (!code) throw createError(404, "Code not found");

    const tokenResponse = await axios.get(
        `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_CALLBACK_URL}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`
    );
    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`
    );
    const profile = profileResponse.data;

    if (!profile) throw createError(404, "Code not found");

    await authMain(
        {
            username: profile.name.split(" ")[0],
            email: profile.email || "",
            id: profile.id,
            // img: profile.picture.data.url,
        },
        res,
        { name: "facebook" }
    );
};
