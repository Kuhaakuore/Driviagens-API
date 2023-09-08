import httpStatus from "http-status";
import flightsService from "../services/flights-service.js";

async function createFlight(req, res) {
  const { body } = req;

  await flightsService.createFlight(body);
  return res.sendStatus(httpStatus.CREATED);
}

const flightsController = { createFlight };

export default flightsController;
