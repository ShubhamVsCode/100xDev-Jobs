import Profile from "@/models/ProfileModel";
import { ProjectSchema, RequestWithUser } from "@/types/user";
import { Response } from "express";

export const addProject = async (req: RequestWithUser, res: Response) => {
  try {
    console.log(req.body);
    const isParsed = ProjectSchema.safeParse(req.body);
    if (!isParsed.success) {
      return res.status(400).json({
        error: {
          message: "Invalid data",
        },
      });
    }

    const profile = await Profile.findById(req.user?.profile);
    if (!profile) {
      return res.status(400).json({
        error: {
          message: "Profile not found",
        },
      });
    }
    profile.projects?.push(isParsed.data);

    await profile.save();

    return res.status(200).json({
      message: "Project created successfully",
      profile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: "Server error",
      },
    });
  }
};

export const updateProject = async (req: RequestWithUser, res: Response) => {
  const { projectId } = req.params;

  try {
    const isParsed = ProjectSchema.safeParse(req.body);
    if (!isParsed.success) {
      return res.status(400).json({
        error: {
          message: "Invalid data",
        },
      });
    }

    const profile = await Profile.findById(req.user?.profile);
    if (!profile) {
      return res.status(400).json({
        error: {
          message: "Profile not found",
        },
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: {
        message: "Invalid data",
      },
    });
  }
};

export const getAllProjects = async (req: RequestWithUser, res: Response) => {
  try {
    const profile = await Profile.findById(req.user?.profile);
    if (!profile) {
      return res.status(400).json({
        error: {
          message: "Profile not found",
        },
      });
    }

    return res.status(200).json({
      projects: profile.projects,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
};
