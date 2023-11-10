import { Router } from "express";
import { login, me, register } from "@/controllers/AuthController";
import { updateProfile } from "@/controllers/ProfileController";

const profileRouter = Router();

profileRouter.get("/", me);
profileRouter.post("/create", updateProfile);
profileRouter.put("/", updateProfile);

export default profileRouter;
