import { incompleteDataError } from "../errors/incompleteData.js";
import { conflictError } from "../errors/conflict.js";
import { notFoundError } from "../errors/notFound.js";
import citiesRepository from "../repositories/cities-repository.js";
import flightsRepository from "../repositories/flights-repository.js";
import { flightDatesSchema, flightSchema } from "../schemas/flights-schema.js";
import dayjs from "dayjs";
import { invalidDatesError } from "../errors/invalidDates.js";

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

async function getFlights(queries) {
  const { origin, destination } = queries;
  const { "smaller-date": smallerDate } = queries;
  const { "bigger-date": biggerDate } = queries;

  const validation = flightDatesSchema.validate(
    { biggerDate, smallerDate },
    { abortEarly: false }
  );

  if (validation.error) throw incompleteDataError();

  if ((biggerDate && !smallerDate) || (!biggerDate && smallerDate))
    throw incompleteDataError();

  if (biggerDate < smallerDate)
    throw invalidDatesError(smallerDate, biggerDate);

  let originId = undefined;
  let destinationId = undefined;

  if (origin) originId = await citiesRepository.getCityId(origin);
  if (destination) destinationId = await citiesRepository.getCityId(destination);

  return flightsRepository.getFlights(
    originId,
    destinationId,
    biggerDate,
    smallerDate
  );
}

const flightsService = { createFlight, getFlights };

export default flightsService;
