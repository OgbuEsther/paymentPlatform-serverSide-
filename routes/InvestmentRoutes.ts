import express from "express";
import { createInvestify, investNow } from "../controller/investmentController";

const InvestmentRoutes = express.Router();

InvestmentRoutes.post("/invest/:id", createInvestify);
InvestmentRoutes.post("/investnow/:id/:walletId/:InvestmentId", investNow);

export default InvestmentRoutes;
