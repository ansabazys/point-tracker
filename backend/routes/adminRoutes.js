import express from "express";
import { logIn, logOut } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", logIn);
router.post("/logout", logOut);

export default router;
