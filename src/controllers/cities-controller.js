import httpStatus from "http-status";
import citiesService from "../services/cities-service.js";

async function createCity(req, res) {
  const { body } = req;

  await citiesService.createCity(body);

  return res.sendStatus(httpStatus.CREATED);
}

const citiesController = { createCity };

export default citiesController;
