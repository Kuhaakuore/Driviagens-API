import { db } from "../configs/db-connection.js";

async function createTravel(passengerId, flightId) {
  await db.query(
    `INSERT INTO travels ("passengerId", "flightId") VALUES ($1, $2)`,
    [passengerId, flightId]
  );
}

const travelsRepository = { createTravel };

export default travelsRepository;