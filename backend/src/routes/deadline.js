import express from "express";
const router = express.Router();

import { authMid } from "#middleware/auth.js";
import {
    findAll,
    findOne,
    findById,
    createByName,
    updateByid,
    deleteByid,
    deleteAll,
} from "#controllers/deadline.js";

router.get("/deadline", authMid, findAll);
router.get("/deadline/:name", authMid, findOne);
router.get("/deadline/:name/:id", authMid, findById);
router.post("/deadline/:name", authMid, createByName);
router.put("/deadline/:name/:id", authMid, updateByid);
router.delete("/deadline/:name/:id", authMid, deleteByid);
router.delete("/deadline/del/:name", authMid, deleteAll);

export default router;
