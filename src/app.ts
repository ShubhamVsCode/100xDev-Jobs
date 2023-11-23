import "module-alias/register";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import CustomError from "@/config/ErrorClass";
import connectDB from "@/config/db/dbConnect";

import authRouter from "@/routes/AuthRoute";
import profileRouter from "@/routes/ProfileRoute";
import { isLoggedIn } from "./middlewares/AuthMiddleware";
import uploadRouter from "./routes/FileRoute";
import homeRouter from "./routes/HomePageRoute";

const app = express();

dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    message: "I Am Healty",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/profile", isLoggedIn, profileRouter);
app.use("/api/upload", isLoggedIn, uploadRouter);

app.use(
  (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
    let json: { error: string; path?: string } = { error: err.message };

    if (process.env.NODE_ENV === "development") {
      console.log(err);
      json = {
        error: err.message,
        path: _req.url,
      };
    }

    return res.status(err.statusCode || 500).json(json);
  }
);

app.listen(PORT, async () => {
  console.log(">>> Server running on port:", PORT);
  await connectDB();
});
