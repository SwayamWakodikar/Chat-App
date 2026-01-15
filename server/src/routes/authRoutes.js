import { register, login, getAllUsers, quickLogin } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/quicklogin", quickLogin);
router.get("/allusers/:id", getAllUsers);

export default router;
