import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import CustomError from "./config/ErrorClass";
dotenv.config();

import authRouter from "./routes/AuthRoute";
import connectDB from "./config/db/dbConnect";

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    message: "I Am Healty",
  });
});

app.use("/api/auth", authRouter);

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

    res.status(err.statusCode || 500).json(json);
  }
);

app.listen(PORT, async () => {
  console.log(">>> Server running on port:", PORT);
  await connectDB();
});
