import { Router } from "express";
import travelsController from "../controllers/travles-controller.js";

const travelsRouter = Router();
travelsRouter.post("/travels", travelsController.createTravel);

export default travelsRouter;
