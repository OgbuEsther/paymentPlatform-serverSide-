import mongoose from "mongoose";
import { locks } from "../../interfaces/dashBoardInterfaces";

interface SaveLock extends locks, mongoose.Document {}

const saveLockSchema = new mongoose.Schema<locks>(
  {
    amount: {
      type: Number,
    },

    lock: {
      type: Boolean,
    },

    payBackTime: {
      type: String,
    },

    interest: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const SaveLockModel = mongoose.model<SaveLock>(
  "lockCollections",
  saveLockSchema
);
