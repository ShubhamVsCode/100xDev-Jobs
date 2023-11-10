import { ProfileType } from "@/types/user";
import mongoose, { Document } from "mongoose";

const skillsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  level: { type: Number, default: 1 },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String },
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
    type: [skillsSchema],
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
