import express from "express";
import { MakeTransfer, registerUser } from "../controller/userControls";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);
userRouter.post("/transaction/:userID/:walletID", MakeTransfer);

export default userRouter;
