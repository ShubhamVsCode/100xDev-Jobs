import { Router } from "express";

const authRouter = Router();

authRouter.get("/me", (req, res) => {});
authRouter.post("/register", (req, res) => {});
authRouter.post("/login", (req, res) => {});

export default authRouter;
