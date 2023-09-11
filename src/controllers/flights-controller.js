import httpStatus from "http-status";
import flightsService from "../services/flights-service.js";

async function createFlight(req, res) {
  const { body } = req;

  await flightsService.createFlight(body);
  return res.sendStatus(httpStatus.CREATED);
}

async function getFlights(req, res) {
  const queries = req.query;
  
  const flights = await flightsService.getFlights(queries);
  return res.send(flights).status(httpStatus[200]);
}

const flightsController = { createFlight, getFlights };

export default flightsController;
