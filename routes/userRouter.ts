import express from "express";
import { registerUser } from "../controller/userControls";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);

export default userRouter;
