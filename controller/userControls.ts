import userModel from "../models/userModel";
import { Request, Response } from "express";
import { userData } from "../interfaces/userInterfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import walletModel from "../models/walletModel";
import mongoose from "mongoose";
import historyModel from "../models/HistoryModel";

export const registerUser = async (
  req: Request<{}, {}, userData>,
  res: Response
): Promise<Response> => {
  try {
    const {
      name,
      userName,
      email,
      password,
      phoneNumber,
      accountNumber,
      verified,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const genDate = Date.now();
    console.log(genDate);

    const genNumber = Math.floor(Math.random() * 52) + genDate;

    const num = 234;

    const user = await userModel.create({
      name,
      userName,
      email,
      password: hashedPassword,
      verified: true,
      phoneNumber: num + phoneNumber,
      accountNumber: genNumber,
    });

    const createWallet = await walletModel.create({
      _id: user?._id,
      balance: 1000,
      credit: 0,
      debit: 0,
    });

    user?.wallet.push(new mongoose.Types.ObjectId(createWallet?._id));

    user.save();

    return res.status(201).json({
      message: "created a user",
      data: user,
      token: jwt.sign(
        { _id: user._id },
        "wearetheherosandweareheretosavetheday"
      ),
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while creating user",
      data: error,
    });
  }
};

//transfer to another wallet

//get all

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "gotten all users",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while creating user",
      data: error,
    });
  }
};

//login user
