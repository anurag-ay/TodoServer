import express from "express";
const router = express.Router();
import { getUser, logIn, registerUser } from "../controller/userController.js";

router.post("/register", registerUser);
router.post("/login", logIn);
router.get("/getUser/:userId", getUser);

export default router;
