import express from "express";
const router = express.Router();

import { authMid } from "#middleware/auth.js";
import {
    getUser,
    getAllUsers,
    getUserbyId,
    updateUserbyId,
    deleteUserbyId,
    createUser,
    deleteUser,
    getUserDB,
} from "#controllers/user.js";

router.get("/user/user/:db", authMid, getUser);
router.get("/user/users/:db", authMid, getAllUsers);
router.get("/user/user/:db/:id", authMid, getUserbyId);
router.put("/user/user/:id", authMid, updateUserbyId);
router.delete("/user/user/:id", authMid, deleteUserbyId);
router.post("/user/user/:db", authMid, createUser);
router.delete("/user/del/:id", authMid, deleteUser);

router.get("/user/db/:db", authMid, getUserDB);

export default router;
