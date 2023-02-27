import mongoose from "mongoose";
import { quicksave } from "../../interfaces/dashBoardInterfaces";

interface quickSaveInfo extends quicksave, mongoose.Document {}

const quickSaveSchema = new mongoose.Schema<quicksave>(
  {
    amount: {
      type: Number,
    },

    dateTime: {
      type: Number,
    },
    interest: {
      type: Number,
    },

    autoSave: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const quickSaveModel = mongoose.model<quickSaveInfo>(
  "quickSaveCollections",
  quickSaveSchema
);

export default quickSaveModel;
