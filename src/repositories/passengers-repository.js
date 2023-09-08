import { db } from "../configs/db-connection.js";

async function createPassenger(firstName, lastName) {
  await db.query(
    `INSERT INTO passengers ("firstName", "lastName") VALUES ($1, $2)`,
    [firstName, lastName]
  );
}

async function getPassengerById(id) {
  const result = await db.query(`SELECT * FROM passengers WHERE id = $1`, [id]);
  return result.rows[0];
}

const passengersRepository = {
  createPassenger,
  getPassengerById,
};

export default passengersRepository;
