import express from "express";
import {
  FundWallet,
  getAllUsers,
  MakeTransfer,
  registerUser,
} from "../controller/userControls";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);
userRouter.post("/transaction/:userID/:walletID", MakeTransfer);
userRouter.post("/fundwallet/:userID/:walletID", FundWallet);
userRouter.get("/", getAllUsers);

export default userRouter;
