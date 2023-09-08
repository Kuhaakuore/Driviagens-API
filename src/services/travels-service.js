import { notFoundError } from "../errors/notFound.js";
import travelsRepository from "../repositories/travels-repository.js";
import { travelSchema } from "../schemas/travels-schema.js";
import passengersRepository from "../repositories/passengers-repository.js";
import flightsRepository from "../repositories/flights-repository.js";
import { incompleteDataError } from "../errors/incompleteData.js";

async function createTravel(body) {
  const validation = travelSchema.validate(body, { abortEarly: false });

  if (validation.error) throw incompleteDataError();

  const { passengerId, flightId } = body;

  const passenger = await passengersRepository.getPassengerById(passengerId);
  const flight = await flightsRepository.getFlightById(flightId);

  if (!passenger || !flight) throw notFoundError("Passageiro ou voo");

  return travelsRepository.createTravel(passengerId, flightId);
}

const travelsService = { createTravel };

export default travelsService;