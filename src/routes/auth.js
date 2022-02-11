import { registerUser, LoginUser } from "../controllers/auth.js";
import { Router } from "express";

const router = Router();

router.post('/login', LoginUser)
router.post('/signup', registerUser)

export default router;