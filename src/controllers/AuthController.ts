import { Request, Response } from "express";
import { comparePassword, createJWT, hashPassword } from "../utils/common";
import { logErrorInDevelopment } from "../utils/devlopment";
import { RequestWithUser, UserSchema } from "../types/user";
import User from "@/models/UserModel";

export async function register(req: Request, res: Response) {
  const { name, email, username, password } = req.body;

  const paresed = UserSchema.safeParse({ name, email, username, password });
  if (!paresed.success) {
    return res.status(400).json({ error: paresed.error });
  }

  const userData = paresed.data;

  try {
    // Getting user with same email or username
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: "User already exists",
        },
      });
    }

    const hashedPassword = hashPassword(userData.password);

    const user = await User.create({ ...userData, password: hashedPassword });
    if (!user) {
      return res.status(400).json({
        error: {
          message: "Not able to create user",
        },
      });
    }

    const token = createJWT(user);
    if (!token) {
      return res.status(400).json({
        error: {
          message: "Not able to create token",
        },
      });
    }

    return res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    logErrorInDevelopment(error, req);

    return res.status(500).json({
      error: {
        message: "Not able to register user",
      },
    });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: {
        message: "Please provide email and password",
      },
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: {
          message: "User not found",
        },
      });
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      // We are not letting the user know that the email id is incorrect or password is incorrect
      return res.status(400).json({
        error: {
          message: "Incorrect Email Id or Password",
        },
      });
    }

    const token = createJWT(user);

    if (!token) {
      return res.status(400).json({
        error: {
          message: "Not able to create token",
        },
      });
    }

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    logErrorInDevelopment(error, req);

    return res.status(500).json({
      error: {
        message: "Not able to login user",
      },
    });
  }
}

export async function me(req: RequestWithUser, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error: {
        message: "User not found",
      },
    });
  }

  return res.status(200).json({
    user: {
      name: user.name,
      email: user.email,
      username: user.username,
    },
  });
}
