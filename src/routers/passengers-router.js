import { Router } from "express";
import passengersController from "../controllers/passengers-controller.js";

const passengersRouter = Router();
passengersRouter.post("/passengers", passengersController.createPassenger);

export default passengersRouter;