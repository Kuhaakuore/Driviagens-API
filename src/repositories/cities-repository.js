import { db } from "../configs/db-connection.js";

async function createCity(name) {
  await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name]);
}

async function getCity(name) {
  const result = await db.query(`SELECT * FROM cities WHERE name = $1`, [name]);

  return result.rows[0];
}

async function getCityById(id) {
  const result = await db.query(`SELECT * FROM cities WHERE id = $1`, [id]);

  return result.rows[0];
}

async function getCityId(name) {
  const result = await db.query(`SELECT id FROM cities WHERE name = $1`, [name]);

  return result.rows[0] ? result.rows[0].id : -1;
}

const citiesRepository = { createCity, getCity, getCityById, getCityId};

export default citiesRepository;
