import Profile from "@/models/ProfileModel";
import User from "@/models/UserModel";
import { ProfileSchema, RequestWithUser } from "@/types/user";
import { Request, Response } from "express";

export async function updateProfile(req: RequestWithUser, res: Response) {
  try {
    const isParsed = ProfileSchema.safeParse(req.body);

    if (!isParsed) {
      return res.status(400).json({
        error: {
          message: "Invalid data",
        },
      });
    }

    const profile = await Profile.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.user?._id },
      { profile }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        message: "Profile update failed",
      },
    });
  }
}
