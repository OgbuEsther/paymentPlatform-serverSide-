import userModel from "../models/userModel";
import { Request, Response } from "express";
import { userData } from "../interfaces/userInterfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const genNumber = Math.floor(Math.random() * 7000) + 69069648;

    const user = await userModel.create({
      name,
      userName,
      email,
      password: hashedPassword,
      verified: true,
      phoneNumber,
      accountNumber,
    });

    return res.status(201).json({
      message: "created a user",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "an error occurred while creating user",
    });
  }
};
