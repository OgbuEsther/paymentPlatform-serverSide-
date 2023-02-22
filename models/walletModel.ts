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
  },
  { timestamps: true }
);

const walletModel = mongoose.model<wallet>("walletCollections", walletSchema);

export default walletModel;
