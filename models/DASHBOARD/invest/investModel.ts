import mongoose from "mongoose";
import { invest } from "../../../interfaces/dashBoardInterfaces";

interface investData extends invest, mongoose.Document {}

const investSchema = new mongoose.Schema<invest>(
  {
    title: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    startTime: {
      type: String,
    },
    percentageInterest: {
      type: Number,
    },
    duration: {
      type: String,
    },
    category: {
      type: String,
    },
    totalUnit: {
      type: Number,
    },
    description: {
      type: String,
    },
    amountPerUnit: {
      type: Number,
    },
    investors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "investorsCollections",
      },
    ],
  },
  { timestamps: true }
);

const investModel = mongoose.model<investData>(
  "investCollections",
  investSchema
);

export default investModel;
