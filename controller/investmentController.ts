import { Request, Response } from "express";
import { getDefaultSettings } from "http2";
import mongoose from "mongoose";
import investModel from "../models/DASHBOARD/invest/investModel";
import investorModel from "../models/DASHBOARD/invest/investors";
import userModel from "../models/userModel";

export const createInvestify = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
  }
};
