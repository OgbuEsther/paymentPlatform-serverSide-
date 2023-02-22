import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

const port: number = 6400;

const app: Application = express();
app.use(express.json());
app.use(cors());

//database connection

const DB_URL = "mongodb://0.0.0.0:27017/paymentPlatform";
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`database connection established`);
  })
  .catch(() => {
    console.log(`an error occurred while connecting`);
  });

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "api is ready for consumption",
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
