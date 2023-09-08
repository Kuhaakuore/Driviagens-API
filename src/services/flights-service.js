import { incompleteDataError } from "../errors/incompleteData.js";
import { conflictError } from "../errors/conflict.js";
import { notFoundError } from "../errors/notFound.js";
import citiesRepository from "../repositories/cities-repository.js";
import flightsRepository from "../repositories/flights-repository.js";
import { flightSchema } from "../schemas/flights-schema.js";
import dayjs from "dayjs";

async function createFlight(body) {
  const validation = flightSchema.validate(body, { abortEarly: false });

  if (validation.error) throw incompleteDataError();

  const { origin, destination, date } = body;

  const originResult = await citiesRepository.getCityById(origin);
  const destinationResult = await citiesRepository.getCityById(destination);

  if (!originResult || !destinationResult)
    throw notFoundError(`Cidade de origem ou de destino`);

  if (origin === destination) throw conflictError("test");

  const now = Date();
  const formattedDate = dayjs(now).format("DD-MM-YYYY");

  if (date < formattedDate) throw incompleteDataError();

  return flightsRepository.createFlight(origin, destination, date);
}

const flightsService = { createFlight };

export default flightsService;
