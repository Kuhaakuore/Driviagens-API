import { Router } from "express";
import travelsController from "../controllers/travles-controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { travelSchema } from "../schemas/travels-schema.js";

const travelsRouter = Router();
travelsRouter.post("/travels", validateSchema(travelSchema), travelsController.createTravel);

export default travelsRouter;
