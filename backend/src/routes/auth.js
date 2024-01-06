import express from "express";
const router = express.Router();

import {
    handleLogin,
    handleLogout,
    handleRegister,
    googleAuth,
    googleAuthCallback,
    facebookAuth,
    facebookCallback,
    lineLiffAuth,
    lineLiffCallback,
} from "#controllers/auth/index.js";

router.post("/auth/login", handleLogin);
router.post("/auth/register", handleRegister);
router.get("/auth/logout", handleLogout);

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

router.get("/auth/facebook", facebookAuth);
router.get("/auth/facebook/callback", facebookCallback);

router.get("/auth/line", lineLiffAuth);
router.get("/auth/line/callback", lineLiffCallback);

export default router;
