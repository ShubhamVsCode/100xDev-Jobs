import User from "@/models/UserModel";
import { Request, Response } from "express";

export const getTopUsers = async (req: Request, res: Response) => {
  try {
    const topUsers = await User.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "profile",
          foreignField: "_id",
          as: "profile",
        },
      },
      {
        $unwind: "$profile",
      },
      //   {
      //     $match: {
      //       verified: true, // Only consider verified users
      //     },
      //   },
      {
        $addFields: {
          projectCount: {
            $size: "$profile.projects",
          },
          hasSocialLinks: {
            $cond: {
              if: {
                $or: [
                  { $ne: ["$profile.social.portfolio", null] },
                  { $ne: ["$profile.social.github", null] },
                  { $ne: ["$profile.social.linkedin", null] },
                  { $ne: ["$profile.social.twitter", null] },
                  { $ne: ["$profile.social.youtube", null] },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $sort: {
          //   verified: -1, // Verified users first
          "profile.likes": -1, // Then by likes in descending order
          projectCount: -1, // Then by project count in descending order
          hasSocialLinks: -1, // Then by presence of social links in descending order
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: 1,
          email: 1,
          username: 1,
          verified: 1,
          "profile.picture": 1,
          "profile.social": 1,
          "profile.skills": 1,
          "profile.projects": 1,
          "profile.likes": 1,
        },
      },
    ]);

    return res.json({
      users: topUsers,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "Something went wrong while getting top users",
      },
    });
  }
};
