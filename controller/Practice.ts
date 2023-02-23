import userModel from "../models/userModel";

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import walletModel from "../models/walletModel";
import mongoose from "mongoose";

//register user

export const SignUp = async (
  req: Request,
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

    // to hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //to generate account number for every user
    const genDate = Date.now();

    const genNumber = Math.floor(Math.random() * 52) + genDate;
    //phone number

    const num = 234;

    const newUser = await userModel.create({
      name,
      userName,
      email,
      password: hashed,
      phoneNumber: 234 + phoneNumber,
      accountNumber: genNumber,
      verified: true,
    });

    const createWallet = await walletModel.create({
      _id: newUser._id,
      balance: 2000,
      credit: 0,
      debit: 0,
    });

    newUser?.wallet?.push(new mongoose.Types.ObjectId(createWallet._id));

    newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token: jwt.sign({ _id: newUser._id }, "wraytsrrwyhsdewt"),
    });
  } catch (error) {
    return res.status(400).json({
      message: "could not sign up",
    });
  }
};

//get all user's information

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

//transactions

export const Transactions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { accountNumber, amount } = req.body;

    const RefNum = Math.floor(Math.random() * 1112623);

    //get receiver's account
    const getReciever = await userModel.findOne({ accountNumber });
    const getRecieverWallet = await walletModel.findById(getReciever!._id);

    //sender account
    const getSender = await userModel.findById(req.params.senderId);
    const getSenderWallet = await walletModel.findById(req.params.walletId);

    if (getSender && getReciever) {
      if (amount > getSenderWallet?.balance!) {
        return res.status(400).json({
          message: "your money no complete 😒😒🤦‍♀️",
        });
      } else {
        //updating the sender wallet

        await userModel.findByIdAndUpdate(getSenderWallet!._id, {
          Balance: getSenderWallet!.balance - amount,
          credit: 0,
          debit: amount,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred",
      data: error,
    });
  }
};
