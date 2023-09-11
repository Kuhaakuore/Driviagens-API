import { Router } from "express";
import citiesController from "../controllers/cities-controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { citieSchema } from "../schemas/citiesSchema.js";

const citiesRouter = Router();
citiesRouter.post("/cities", validateSchema(citieSchema), citiesController.createCity);

export default citiesRouter;