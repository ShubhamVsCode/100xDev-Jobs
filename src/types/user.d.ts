import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid username format"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profilePicture: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
