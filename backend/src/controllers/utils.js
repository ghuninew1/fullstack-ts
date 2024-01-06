import createError from "#utils/createError.js";
import mailSend from "#utils/mailSend.js";
import lineNotify from "#utils/lineNotify.js";

export const sendNotify = async (req, res, next) => {
    try {
        const message = req.query.message || req.body.message;

        if (!message) throw createError(404, "message is empty");

        const encodedMessage = encodeURIComponent(message);
        const Notify = await lineNotify(`message=${encodedMessage}`);

        if (Notify instanceof Error) throw createError(404, Notify.message);

        return res.status(200).json({ message: "send notify success" });
    } catch (err) {
        next(err);
    }
};

export const sendMail = (req, res, next) => {
    const { email, subject, text, html } = req.body;
    if (!email) throw createError(404, "email is empty");
    try {
        const mail = mailSend(email, subject, text, html);
        if (mail instanceof Error) throw createError(404, mail.message);

        res.status(200).json({ message: "send mail success" });
    } catch (err) {
        next(err);
    }
};
