import mongoose from "mongoose";
import { target } from "../../interfaces/dashBoardInterfaces";

interface MainData extends target, mongoose.Document {}

const TargetSchema = new mongoose.Schema<target>(
  {
    amount: {
      type: Number,
    },

    targetValue: {
      type: Boolean,
    },

    fixedAmount: {
      type: Number,
    },

    interest: {
      type: Number,
    },
    dateTime: {
      type: String,
    },

    title: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<MainData>("targetCollections", TargetSchema);
