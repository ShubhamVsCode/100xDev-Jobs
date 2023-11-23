import { getTopUsers } from "@/controllers/UserController";
import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/users/top", getTopUsers);

export default homeRouter;
