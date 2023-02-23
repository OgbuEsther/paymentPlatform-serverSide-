import userModel from "../models/userModel";

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      name,
      userName,
      email,
      password: hashed,
      phoneNumber,
      accountNumber,
      verified,
    });
    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "could not sign up",
    });
  }
};
