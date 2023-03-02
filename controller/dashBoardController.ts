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
  } catch (error) {
    return res.status(404).json({
      message: "an error occured",
    });
  }
};
