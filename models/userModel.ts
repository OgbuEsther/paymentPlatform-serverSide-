import mongoose from "mongoose";
import { userData } from "../interfaces/userInterfaces";

interface user extends userData, mongoose.Document {}

const userSchema = new mongoose.Schema<userData>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  userName: {
    type: String,
  },

  verified: {
    type: Boolean,
  },
  wallet: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "walletCollections",
    },
  ],
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "historyCollections",
    },
  ],
});

const userModel = mongoose.model<user>("");
