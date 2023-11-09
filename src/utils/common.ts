import bcrypt from "bcryptjs";
import { UserType } from "../types/user";
import jwt from "jsonwebtoken";

/**
 * Compares a candidate password with a hashed password.
 *
 * @param {string} candidatePassword - The password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @return {boolean} Returns true if the candidate password matches the hashed password, otherwise false.
 */
export function comparePassword(
  candidatePassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(candidatePassword, hashedPassword);
}

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @return {string} - The hashed password.
 */
export function hashPassword(password: string) {
  return bcrypt.hashSync(password);
}

/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param {UserType} user - The user object containing the user's ID, email, and username.
 * @return {string} The generated JWT.
 */
export function createJWT(user: UserType) {
  const token = jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET!
  );
  return token;
}

/**
 * Decodes a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT to decode.
 * @return {any} The decoded payload of the JWT.
 */
export function decodeJWT(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
