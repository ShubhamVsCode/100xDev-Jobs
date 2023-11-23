import { Router } from "express";
import {
  addSkills,
  createProfile,
  getAllSkills,
  getProfile,
  updateProfile,
  verifyProfile,
} from "@/controllers/ProfileController";
import { addProject } from "@/controllers/ProjectController";

const profileRouter = Router();

profileRouter.get("/", getProfile);
profileRouter.get("/verify", verifyProfile);
profileRouter.post("/create", createProfile);
profileRouter.put("/update", updateProfile);
profileRouter.post("/skills/add", addSkills);
profileRouter.get("/skills/all", getAllSkills);

// Project Add
profileRouter.post("/project/add", addProject);

export default profileRouter;
