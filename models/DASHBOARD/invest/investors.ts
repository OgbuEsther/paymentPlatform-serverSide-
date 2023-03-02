import mongoose from "mongoose";
import { investorData } from "../../../interfaces/dashBoardInterfaces";

interface investor extends investorData, mongoose.Document {}

const investorSchema = new mongoose.Schema<investorData>({});
