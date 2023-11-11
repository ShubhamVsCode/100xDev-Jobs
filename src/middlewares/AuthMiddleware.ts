import { NextFunction, Response } from "express";
import { decodeJWT } from "@/utils/common";
import { RequestWithUser, UserType } from "@/types/user";
import User from "@/models/UserModel";

export async function isLoggedIn(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  let token = req.header("Authorization") || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  token = token.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = decodeJWT(token) as UserType;

    const user = await User.findById(decoded?._id);
    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
