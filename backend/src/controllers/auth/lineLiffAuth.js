import createError from "#utils/createError.js";
import axios from "axios";
import authMain from "./authMain.js";

// const LINE_LIFF_ID = process.env.LINE_LIFF_ID;
// const LINE_LIFF_URL = process.env.LINE_LIFF_URL;
const LINE_CHANNEL_ID = process.env.LINE_CHANNEL_ID;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_CALLBACK_URL = process.env.LINE_CALLBACK_URL;

export const lineLiffAuth = (req, res, next) => {
    const liffUrlAuth = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CHANNEL_ID}&redirect_uri=${LINE_CALLBACK_URL}&scope=profile%20openid%20email&state=123456789&nonce=0987654321`;
    res.redirect(liffUrlAuth);
};

export const lineLiffCallback = async (req, res, next) => {
    const { code } = req.query;
    const lineLiffCallbackUrl = `https://api.line.me/oauth2/v2.1/token`;

    const tokenResponse = await axios.post(
        lineLiffCallbackUrl,
        {
            grant_type: "authorization_code",
            code,
            redirect_uri: LINE_CALLBACK_URL,
            client_id: LINE_CHANNEL_ID,
            client_secret: LINE_CHANNEL_SECRET,
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    const { access_token } = tokenResponse.data;
    const profileUrl = `https://api.line.me/v2/profile`;
    const profileResponse = await axios.get(profileUrl, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const profile = profileResponse.data;
    if (!profile) throw createError(404, "Code not found");

    await authMain(
        {
            username: profile.displayName.split(" ")[0],
            email: profile.email || "",
            id: profile.userId,
            img: profile.pictureUrl || "",
        },
        res,
        { name: "line" }
    );
};
