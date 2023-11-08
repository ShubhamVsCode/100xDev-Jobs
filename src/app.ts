import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import CustomError from "./config/ErrorClass";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    message: "I Am Healty",
  });
});

app.use(
  (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
);

app.listen(PORT, () => {
  console.log(">>> Server running on port:", PORT);
});
