import mongoose from "mongoose";
import { HistoryData } from "../interfaces/HistoryInterface";

interface History extends HistoryData, mongoose.Document {}

const historySchema = new mongoose.Schema<HistoryData>(
  {
    message: {
      type: String,
    },

    transactionReference: {
      type: String,
    },

    transactionType: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const walletModel = mongoose.model<History>(
  "historyCollections",
  historySchema
);

export default walletModel;
