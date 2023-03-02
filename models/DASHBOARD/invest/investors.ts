import mongoose from "mongoose";
import { investorData } from "../../../interfaces/dashBoardInterfaces";

interface investor extends investorData, mongoose.Document {}

const investorSchema = new mongoose.Schema<investorData>(
  {
    investorId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    unit: {
      type: Number,
    },
  },
  { timestamps: true }
);

const investorModel = mongoose.model<investor>(
  "investorsCollections",
  investorSchema
);

export default investorModel;
