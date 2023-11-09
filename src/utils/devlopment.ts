import { Request } from "express";

export function logErrorInDevelopment(error: any, req: Request) {
  if (process.env.NODE_ENV === "development") {
    console.log("Error on DEV:", error);
    console.log("Error on URL:", req.url);
  }
}
