import mongoose from "mongoose";
import { userData } from "../interfaces/userInterfaces";

interface user extends userData, mongoose.Document {}

const userSchema = new mongoose.Schema<userData>(
  {
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
      required: true,
    },

    accountNumber: {
      type: Number,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    userName: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const userModel = mongoose.model<user>("userCollctions", userSchema);

export default userModel;
