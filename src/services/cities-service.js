import citiesRepository from "../repositories/cities-repository.js";

async function createCity(body) {
  const { name } = body;

  const existingCity = await citiesRepository.getCity(name);

  if (existingCity) throw { type: "conflict", message: `A city with the name ${name} has already been added!` };

  return citiesRepository.createCity(name);
}

const citiesService = { createCity };

export default citiesService;
