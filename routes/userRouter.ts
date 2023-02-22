import express from "express";
import {
  getAllUsers,
  MakeTransfer,
  registerUser,
} from "../controller/userControls";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);
userRouter.post("/transaction/:userID/:walletID", MakeTransfer);
userRouter.get("/", getAllUsers);

export default userRouter;
