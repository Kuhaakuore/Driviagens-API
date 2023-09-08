import { incompleteDataError } from "../errors/incompleteData.js";
import { conflictError } from "../errors/conflict.js";
import citiesRepository from "../repositories/cities-repository.js";
import { citieSchema } from "../schemas/citiesSchema.js";

async function createCity(body) {
  const validation = citieSchema.validate(body, { abortEarly: false });

  if (validation.error) throw incompleteDataError();

  const { name } = body;

  const existingCity = await citiesRepository.getCity(name);

  if (existingCity) throw conflictError(`Uma cidade com nome ${name}`);

  return citiesRepository.createCity(name);
}

const citiesService = { createCity };

export default citiesService;