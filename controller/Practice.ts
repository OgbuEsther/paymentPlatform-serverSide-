import userModel from "../models/userModel";
import historyModel from "../models/HistoryModel";
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

export const transactions = async (req: Request, res: Response) => {
  try {
    const { accountNumber, amount } = req.body;

    const refNum = (await Math.floor(Math.random() * 234)) + 2468;
    //get sender details
    const sender = await userModel.findById(req.params.senderID);
    const senderWallet = await walletModel.findById(sender?._id);

    //get receiver details
    const receiver = await userModel.findOne({ accountNumber });
    const receiverWallet = await walletModel.findById(req.params.receiverID);

    if (sender && receiver) {
      if (amount > senderWallet?.balance!) {
        return res.status(400).json({
          message: "insufficient funds",
        });
      } else {
        //upadting sender account
        await walletModel.findByIdAndUpdate(senderWallet?._id, {
          Balance: senderWallet?.balance! - amount,
          credit: 0,
          debit: amount,
        });

        //getting sender transaction history

        const senderHistory = await historyModel.create({
          transactionType: "debit",
          transactionReference: refNum,
          message: `you have sent ${amount} to ${receiver?.name}`,
        });

        sender?.history?.push(new mongoose.Types.ObjectId(senderHistory?._id));
        sender.save();

        //updating receiver account
        await walletModel.findByIdAndUpdate(receiverWallet?._id, {
          Balance: receiverWallet?.balance! + amount,
          debit: 0,
          credit: amount,
        });

        //getting receiver transaction history

        const receiverHistory = await historyModel.create({
          transactionType: "credit",
          transactionReference: refNum,
          message: `you have received ${amount} from ${sender?.name}`,
        });

        receiver?.history?.push(
          new mongoose.Types.ObjectId(receiverHistory?._id)
        );
        receiver.save();
      }
      return res.status(200).json({
        message: "Success",
        data: `transaction successful`,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred",
      data: error,
    });
  }
};
