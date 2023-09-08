import { db } from "../configs/db-connection.js";

async function createFlight(origin, destination, date) {
  await db.query(
    `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`,
    [origin, destination, date]
  );
}

async function getFlightById(id) {
  const result = await db.query(`SELECT * FROM flights WHERE id = $1`, [id]);
  return result.rows[0];
}

const flightsRepository = { createFlight, getFlightById };

export default flightsRepository;
