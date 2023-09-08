import { db } from "../configs/db-connection.js";

async function createCity(name) {
  await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name]);
}

async function getCity(name) {
  const result = await db.query(`SELECT * FROM cities WHERE name = $1`, [name]);

  return result.rows[0];
}

const citiesRepository = { createCity, getCity};

export default citiesRepository;
