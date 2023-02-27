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
        ref: "quickSaveCollections",
      },
    ],
    saveLock: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lockCollections",
      },
    ],
    target: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "targetCollections",
      },
    ],
  },
  { timestamps: true }
);

const walletModel = mongoose.model<wallet>("walletCollections", walletSchema);

export default walletModel;
