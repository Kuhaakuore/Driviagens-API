import { Router } from "express";
import passengersController from "../controllers/passengers-controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengersSchema.js";

const passengersRouter = Router();
passengersRouter.post("/passengers", validateSchema(passengerSchema), passengersController.createPassenger);
passengersRouter.get("/passengers/travels", passengersController.getPassengersTravels);

export default passengersRouter;