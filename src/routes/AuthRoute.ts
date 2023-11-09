import { Router } from "express";
import { isLoggedIn } from "@/middlewares/AuthMiddleware";
import { login, me, register } from "@/controllers/AuthController";

const authRouter = Router();

authRouter.get("/me", isLoggedIn, me);
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
