import travelsRepository from "../repositories/travels-repository.js";
import passengersRepository from "../repositories/passengers-repository.js";
import flightsRepository from "../repositories/flights-repository.js";

async function createTravel(body) {
  const { passengerId, flightId } = body;

  const passenger = await passengersRepository.getPassengerById(passengerId);
  const flight = await flightsRepository.getFlightById(flightId);

  if (!passenger)
    throw {
      type: "notFound",
      message: `Unable to find passenger with ID: ${passengerId}!`,
    };
  if (!flight)
    throw {
      type: "notFound",
      message: `Unable to find flight with ID: ${flightId}!`,
    };

  return travelsRepository.createTravel(passengerId, flightId);
}

const travelsService = { createTravel };

export default travelsService;
