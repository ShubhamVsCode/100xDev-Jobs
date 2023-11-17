import Profile from "@/models/ProfileModel";
import Skills from "@/models/SkillsModel";
import User from "@/models/UserModel";
import { ProfileSchema, RequestWithUser, SkillSchema } from "@/types/user";
import { Request, Response } from "express";
import axios from "axios";

export async function getProfile(req: RequestWithUser, res: Response) {
  try {
    const user = await User.findById(req.user?._id).populate("profile");
    if (!user?.profile) {
      return res.status(400).json({
        error: {
          message: "Profile not found",
        },
      });
    }

    return res.status(200).json({
      profile: user?.profile,
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        message: "Profile not found",
      },
    });
  }
}

export async function verifyProfile(req: RequestWithUser, res: Response) {
  try {
    const response = await axios.post(
      "https://harkiratapi.classx.co.in/user/verify",
      {
        email: req.user?.email,
      }
    );

    if (response.data?.status !== "success") {
      return res.status(400).json({
        error: {
          message: "Profile verification failed",
        },
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        verified: true,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Profile verified successfully",
      user,
      status: response.data.status === "success" ? true : false,
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        message: "Profile verification failed",
      },
    });
  }
}

export async function createProfile(req: RequestWithUser, res: Response) {
  try {
    const isParsed = ProfileSchema.safeParse(req.body);

    if (!isParsed.success) {
      return res.status(400).json({
        error: {
          message: "Invalid data",
        },
      });
    }

    const profile = await Profile.create(isParsed.data);
    const user = await User.findOneAndUpdate(
      { _id: req.user?._id },
      { profile }
    );

    return res.status(200).json({
      message: "Profile created successfully",
      profile,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      error: {
        message: "Profile creation failed",
      },
    });
  }
}

export async function updateProfile(req: RequestWithUser, res: Response) {
  try {
    const isParsed = ProfileSchema.safeParse(req.body);

    if (!isParsed.success) {
      return res.status(400).json({
        error: {
          message: "Invalid data",
        },
      });
    }

    const profile = await Profile.findByIdAndUpdate(
      req.user?.profile,
      isParsed.data
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: "Profile update failed",
      },
    });
  }
}

export async function addSkills(req: RequestWithUser, res: Response) {
  const { skills } = req.body;

  const isParsed = SkillSchema.safeParse(skills);

  if (!isParsed.success) {
    return res.status(400).json({
      error: {
        message: "Invalid data",
      },
    });
  }
  try {
    const skill = await Skills.create(isParsed.data);

    return res.status(200).json({
      message: `${isParsed.data.name} added successfully`,
      skill,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Skill addition failed",
      },
    });
  }
}

export async function getAllSkills(req: Request, res: Response) {
  const skills = await Skills.find();
  return res.status(200).json({
    skills,
  });
}
