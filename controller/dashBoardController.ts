import quickSaveModel from "../models/DASHBOARD/QuickSave";
import walletModel from "../models/walletModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const createQuickSave = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { amount } = req.body;
    const getWallet = await walletModel.findById(req.params.walletId);

    const newDate = new Date().toDateString();

    if (amount > getWallet?.balance!) {
      return res.status(400).json({
        message:
          "This transaction cannot be completed because of insufficient balance",
      });
    } else {
      const creating = await quickSaveModel.create({
        amount,
        autoSave: false,
        dateTime: newDate,
        interest: 0.1,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "an error occured",
    });
  }
};
