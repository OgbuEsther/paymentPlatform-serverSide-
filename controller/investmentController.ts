import { Request, Response } from "express";
import { getDefaultSettings } from "http2";
import mongoose from "mongoose";
import investModel from "../models/DASHBOARD/invest/investModel";
import investorModel from "../models/DASHBOARD/invest/investors";
import userModel from "../models/userModel";
import walletModel from "../models/walletModel";

export const createInvestify = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getUser = await userModel.findById(req.params.id);

    const getDate = new Date().toDateString();

    if (getUser?.isAdmin === true) {
      const {
        title,

        description,

        duration,

        amountPerUnit,
      } = req.body;

      const creating = await investModel.create({
        title,
        description,
        startTime: getDate,
        duration,
        status: true,
        totalUnit: 200,
        amountPerUnit,
      });
      return res.status(200).json(creating);
    } else {
      return res.status(404).json({
        message: "UnAuthorized User",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "an error occurred while creating",
    });
  }
};

//

export const investNow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getWallet = await walletModel.findById(req.params.walletId);

    const { unit } = req.body;

    const getInvestment = await investModel.findById(req.params.investId);
    const getUser = await userModel.findById(req.params.userId);
  } catch (error) {
    return res.status(404).json({
      message: "an error occurred while creating",
    });
  }
};
