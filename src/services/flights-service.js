import citiesRepository from "../repositories/cities-repository.js";
import flightsRepository from "../repositories/flights-repository.js";
import { flightDatesSchema } from "../schemas/flights-schema.js";
import dayjs from "dayjs";
import formatDate from "../utils/format-date.js";

async function createFlight(body) {
  const { origin, destination, date } = body;

  const originResult = await citiesRepository.getCityById(origin);
  const destinationResult = await citiesRepository.getCityById(destination);

  if (!originResult)
    throw {
      type: "notFound",
      message: `Unable to find any city named ${origin}!`,
    };
  if (!destinationResult)
    throw {
      type: "notFound",
      message: `Unable to find any city named ${destination}!`,
    };

  if (origin === destination)
    throw {
      type: "notFound",
      message: `The flight's origin and destination can't be the same!`,
    };

  const now = dayjs(Date()).format("DD-MM-YYYY");

  if (formatDate(date) <= formatDate(now))
    throw {
      type: "unprocessableEntity",
      message: `The flight date cannot be earlier than or equal to the current date!`,
    };

  return flightsRepository.createFlight(origin, destination, date);
}

async function getFlights(queries) {
  const { origin, destination, page } = queries;
  const { "smaller-date": smallerDate } = queries;
  const { "bigger-date": biggerDate } = queries;
  const flightsPerPage = 10;
  let limit = undefined;

  const validation = flightDatesSchema.validate(
    { biggerDate, smallerDate },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    throw { type: "unprocessableEntity", message: errors };
  }

  if ((biggerDate && !smallerDate) || (!biggerDate && smallerDate))
    throw {
      type: "unprocessableEntity",
      message: `Please define both dates endpoints!`,
    };

  if (biggerDate < smallerDate)
    throw {
      type: "badRequest",
      message: `smaller-date param has to be an earlier date than the bigger-date param!`,
    };

  if (page) {
    if (page <= 0 || isNaN(Number(page))) {
      throw { type: "badRequest", message: "Invalid page value!" };
    }
    limit = 10;
  }

  const pageNumber = page ? Number(page) : 1;
  const offset = (pageNumber - 1) * flightsPerPage;
  let originId = undefined;
  let destinationId = undefined;

  if (origin) originId = await citiesRepository.getCityId(origin);
  if (destination)
    destinationId = await citiesRepository.getCityId(destination);

  return flightsRepository.getFlights(
    originId,
    destinationId,
    biggerDate,
    smallerDate,
    offset,
    limit
  );
}

const flightsService = { createFlight, getFlights };

export default flightsService;
