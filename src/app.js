import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import passengersRouter from "./routers/passengers-router.js";
import citiesRouter from "./routers/cities-router.js";
import flightsRouter from "./routers/flights-router.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import travelsRouter from "./routers/travels-router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(passengersRouter);
app.use(citiesRouter);
app.use(flightsRouter);
app.use(travelsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
