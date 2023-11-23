import { ProfileType, ProjectType } from "@/types/user";
import mongoose, { Document } from "mongoose";
import Skills from "./SkillsModel";

const projectSchema = new mongoose.Schema<ProjectType & Document>({
  name: { type: String, required: true },
  githubLink: { type: String, required: true },
  deployedLink: { type: String },
  description: { type: String, required: true },
  images: {
    type: [String],
  },
  videoLink: {
    type: String,
  },
});

const profileSchema = new mongoose.Schema<ProfileType & Document>({
  picture: String,
  social: {
    portfolio: String,
    github: String,
    linkedin: String,
    twitter: String,
    youtube: String,
  },
  skills: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill",
  },
  projects: {
    type: [projectSchema],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
