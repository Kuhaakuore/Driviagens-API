import passengersRepository from "../repositories/passengers-repository.js";

async function createPassenger(body) {
  const { firstName, lastName } = body;

  return await passengersRepository.createPassenger(firstName, lastName);
}

async function getPassengersTravels(queries) {
  const { name, page } = queries;
  const recordsPerPage = 10;
  let limit = undefined;

  if (page) {
    if (page <= 0 || isNaN(Number(page))) {
      throw { type: "badRequest", message: "Invalid page value!" };
    }
    limit = 10;
  }

  const pageNumber = page ? Number(page) : 1;
  const offset = (pageNumber - 1) * recordsPerPage;

  const travels = await passengersRepository.getPassengersTravels(name, offset, limit);

  if (travels.length > 10)
    throw { type: "tooManyResults", message: `Too many results!` };

  return travels;
}

const passengersService = { createPassenger, getPassengersTravels };

export default passengersService;
