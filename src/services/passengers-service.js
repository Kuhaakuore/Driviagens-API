import { incompleteDataError } from "../errors/incompleteData.js";
import { passengerSchema } from "../schemas/passengerSchema.js";
import passengersRepository from "../repositories/passengers-repository.js";

async function createPassenger(body) {
  const validation = passengerSchema.validate(body, { abortEarly: false });

  if (validation.error) throw incompleteDataError();

  const { firstName, lastName } = body;

  return passengersRepository.createPassenger(firstName, lastName);
}

const passengersService = { createPassenger };

export default passengersService;