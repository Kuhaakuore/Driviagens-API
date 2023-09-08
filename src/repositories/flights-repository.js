import { db } from "../configs/db-connection.js";

async function createFlight(origin, destination, date) {
  await db.query(
    `INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`,
    [origin, destination, date]
  );
}

const flightsRepository = { createFlight };

export default flightsRepository;