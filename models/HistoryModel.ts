import mongoose from "mongoose";
import { HistoryData } from "../interfaces/HistoryInterface";

interface History extends HistoryData, mongoose.Document {}

const historySchema = new mongoose.Schema<HistoryData>(
  {
    message: {
      type: String,
    },

    transactionReference: {
      type: Number,
    },

    transactionType: {
      type: String,
    },
  },
  { timestamps: true }
);

const historyModel = mongoose.model<History>(
  "historyCollections",
  historySchema
);

export default historyModel;
