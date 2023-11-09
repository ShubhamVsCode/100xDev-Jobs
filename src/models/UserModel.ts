import { Document, Schema, model } from "mongoose";
import { UserType } from "@/types/user";

const userSchema = new Schema<UserType & Document>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

const User = model<UserType & Document>("User", userSchema);

export default User;
