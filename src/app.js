import express, { json } from "express";
import dotenv from "dotenv";
// import errorHandler from "./middlewares/error-middleware.js";
dotenv.config();

const app = express();
app.use(json());
// app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
