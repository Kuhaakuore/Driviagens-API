import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import passengersRouter from "./routers/passengers-router.js";
import citiesRouter from "./routers/cities-router.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(passengersRouter);
app.use(citiesRouter);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});