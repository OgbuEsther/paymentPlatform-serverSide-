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

export const MakeTransfer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { accountNumber, amount } = req.body;

    const referenceGeneratedNumber = Math.floor(Math.random() * 67485753) + 234;

    //receiver account

    const getReceiver = await userModel.findOne({ accountNumber });
    const getReceiverWallet = await walletModel.findById(getReceiver?._id);

    //sender account
    const getUser = await userModel.findById(req.params.userID);
    const getUserWallet = await walletModel.findById(req.params.walletID);

    if (getUser && getReceiver) {
      if (getUser.accountNumber === accountNumber) {
        return res.status(400).json({
          message: `bad request , you can't send money to yourself`,
        });
      }
      if (amount > getUserWallet?.balance!) {
        return res.status(404).json({
          message: "insufficent funds",
        });
      } else {
        //updating the sender wallet
        await walletModel.findByIdAndUpdate(getUserWallet?._id, {
          balance: getUserWallet?.balance! - amount,
          credit: 0,
          debit: amount,
        });

        const createHistorySender = await historyModel.create({
          message: `you have sent ${amount} to ${getReceiver?.name}`,
          transactionType: "debit",
          transactionReference: referenceGeneratedNumber,
        });

        getUser?.history?.push(
          new mongoose.Types.ObjectId(createHistorySender?._id)
        );
        getUser?.save();

        await walletModel.findByIdAndUpdate(getReceiverWallet?._id, {
          balance: getReceiverWallet?.balance! + amount,
          credit: amount,
          debit: 0,
        });

        const createHistoryReceiver = await historyModel.create({
          message: `an amount of ${amount} has been sent to you by ${getUser?.name}`,
          transactionType: "credit",
          transactionReference: referenceGeneratedNumber,
        });

        getReceiver?.history?.push(
          new mongoose.Types.ObjectId(createHistoryReceiver?._id)
        );
        getReceiver?.save();
      }

      return res.status(200).json({
        message: "transaction successful",
      });
    } else {
      return res.status(404).json({
        message: "Account not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while creating user",
      data: error,
    });
  }
};

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
export const getOneUsers = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findById(req.params.id);

    return res.status(200).json({
      message: "gotten one user",
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

//transfer from your bank to your wallet

export const FundWallet = async (req: Request, res: Response) => {
  try {
    //get user details
    const getUser = await userModel.findById(req.params.userId);
    //get wallet details
    const getWallet = await walletModel.findById(req.params.walletId);

    //make request from the body
    const { amount, transRef } = req.body;

    //updating balance
    await walletModel.findByIdAndUpdate(getWallet?._id, {
      balance: getWallet?.balance + amount,
    });

    const getWalletHistory = await historyModel.create({
      message: `you transferred ${amount} to yourself`,
      transactionType: "credit",
      transactionReference: transRef,
    });
    getUser?.history?.push(new mongoose.Types.ObjectId(getWalletHistory?._id));
    getUser?.save();

    return res.status(200).json({
      message: `transfer sucessful`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while making transations ",
      data: error,
    });
  }
};
