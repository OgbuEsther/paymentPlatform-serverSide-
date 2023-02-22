import mongoose from "mongoose";
import { userData } from "../interfaces/userInterfaces";

interface user extends userData, mongoose.Document {}

const userSchema = new mongoose.Schema<userData>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  userName: {
    type: String,
  },
});
