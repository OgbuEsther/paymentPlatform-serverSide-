import mongoose from "mongoose";
import { walletData } from "../interfaces/walletInterfaces";

interface wallet extends walletData, mongoose.Document {}

const walletSchema = new mongoose.Schema<walletData>(
  {
    credit: {
      type: Number,
    },

    balance: {
      type: Number,
    },

    debit: {
      type: Number,
    },
    quickSave: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
      },
    ],
    saveLock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
      },
    ],
    target: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
      },
    ],
  },
  { timestamps: true }
);

const walletModel = mongoose.model<wallet>("walletCollections", walletSchema);

export default walletModel;
