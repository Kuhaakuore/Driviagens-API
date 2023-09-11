import passengersRepository from "../repositories/passengers-repository.js";

async function createPassenger(body) {
  const { firstName, lastName } = body;

  return await passengersRepository.createPassenger(firstName, lastName);
}

async function getPassengersTravels(queries) {
  const { name } = queries;

  const travels = await passengersRepository.getPassengersTravels(name);

  if (travels.length > 10)
    throw { type: "tooManyResults", message: `Too many results!` };

  return travels;
}

const passengersService = { createPassenger, getPassengersTravels };

export default passengersService;
