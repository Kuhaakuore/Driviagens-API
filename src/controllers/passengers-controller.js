import httpStatus from "http-status";
import passengersService from "../services/passengers-service.js";

async function createPassenger(req, res) {
  const { body } = req;

  await passengersService.createPassenger(body);
  return res.sendStatus(httpStatus.CREATED);
}

async function getPassengersTravels(req, res) {
  const queries = req.query;

  const travels = await passengersService.getPassengersTravels(queries);
  return res.send(travels).status(httpStatus[200]);
}

const passengersController = { createPassenger, getPassengersTravels };

export default passengersController;
