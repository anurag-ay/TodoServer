import express from "express";
const router = express.Router();
import { decodeTokenController } from "../controller/decodeTokenController.js";

router.post("/", decodeTokenController);

export default router;
