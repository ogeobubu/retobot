import { Router } from "express";
import RetoBot from "../controllers/RetoBot";

const botRouter = Router();

botRouter.post("/incoming", RetoBot);

export default botRouter;
