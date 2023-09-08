import { db } from "../configs/db-connection.js";

async function createPassenger(firstName, lastName) {
  await db.query(
    `INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2)`,
    [firstName, lastName]
  );
}

const passengersRepository = {
  createPassenger,
};

export default passengersRepository;
