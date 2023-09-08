import { Router } from "express";
import citiesController from "../controllers/cities-controller.js";

const citiesRouter = Router();
citiesRouter.post("/cities", citiesController.createCity);

export default citiesRouter;