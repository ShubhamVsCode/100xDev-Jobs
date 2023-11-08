import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

app.listen(PORT, () => {
  console.log(">>> Server running on port:", PORT);
});
