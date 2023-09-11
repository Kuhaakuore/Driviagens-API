import httpStatus from "http-status";
import travelsService from "../services/travels-service.js";

async function createTravel(req, res) {
  const { body } = req;

  await travelsService.createTravel(body);
  return res.sendStatus(httpStatus.CREATED);
}

const travelsController = { createTravel };

export default travelsController;
