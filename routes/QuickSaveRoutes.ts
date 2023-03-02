import { Router } from "express";
import { claimDaily, createQuickSave } from "../controller/dashBoardController";

const quickSaveRoutes = Router();

quickSaveRoutes.post("/quicksave/:walletId", createQuickSave);
quickSaveRoutes.post("/getinterest/:saveId", claimDaily);

export default quickSaveRoutes;
