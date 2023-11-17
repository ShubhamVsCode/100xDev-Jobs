import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  picture: {
    type: String,
    required: true,
  },
});

const Skills = mongoose.model("Skills", skillsSchema);

export default Skills;
