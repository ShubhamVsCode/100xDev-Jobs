import { Request } from "express";
import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid username format"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profile: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

export interface RequestWithUser extends Request {
  user?: UserType;
}

// Skill
export const SkillSchema = z.object({
  name: z.string(),
  slug: z.string(),
  level: z.number(),
});

// Project
export const ProjectSchema = z.object({
  name: z.string(),
  link: z.string().url("Invalid Project URL").optional(),
  description: z.string(),
  images: z.array(z.string()).optional(),
  videoLink: z.string().optional(),
});

// Social
export const SocialSchema = z.object({
  portfolio: z.string().url("Invalid Portfolio URL").optional(),
  github: z.string().url("Invalid Github URL").optional(),
  linkedin: z.string().url("Invalid Linkedin URL").optional(),
  twitter: z.string().url("Invalid Twitter URL").optional(),
  youtube: z.string().url("Invalid Youtube URL").optional(),
});

// Profile
export const ProfileSchema = z.object({
  _id: z.string().optional(),
  picture: z.string().url("Invalid Profile Picture URL").optional(),
  social: SocialSchema,
  skills: z.array(SkillSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  likes: z.number().optional(),
});

export type ProfileType = z.infer<typeof ProfileSchema>;
