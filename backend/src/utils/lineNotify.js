import axios from "axios";
import createError from "./createError.js";

const lineNotify = async (message) => {
    if (!message) throw createError(404, "message is empty");
    const url = process.env.LINE_NOTIFY_URL;
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${process.env.LINE_NOTIFY_TONKEN2}`,
    };
    const encodedMessage = encodeURIComponent(message);
    const body = `message=${encodedMessage}`;

    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export default lineNotify;
