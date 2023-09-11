import { incompleteDataError } from "../errors/incompleteData.js";
import { passengerSchema } from "../schemas/passengersSchema.js";
import passengersRepository from "../repositories/passengers-repository.js";
import { tooManyResultsError } from "../errors/tooManyResults.js";

async function createPassenger(body) {
  const validation = passengerSchema.validate(body, { abortEarly: false });

  if (validation.error) throw incompleteDataError();

  const { firstName, lastName } = body;

  return await passengersRepository.createPassenger(firstName, lastName);
}

async function getPassengersTravels(queries) {
  const { name } = queries;

  const travels = await passengersRepository.getPassengersTravels(name);

  if (travels.length > 10) throw tooManyResultsError();

  return travels;
}

const passengersService = { createPassenger, getPassengersTravels };

export default passengersService;