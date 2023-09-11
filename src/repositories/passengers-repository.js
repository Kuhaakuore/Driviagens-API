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

async function getPassengersTravels(name, offset, limit) {
  let query = `SELECT passengers."firstName", passengers."lastName",
                (SELECT COUNT(*) FROM travels WHERE travels."passengerId" = passengers.id) AS travels
                FROM passengers
                WHERE 1=1 `;
  const values = [];

  if (name) {
    values.push(`%${name}%`);
    query += ` AND (passengers."firstName" ILIKE $${values.length} OR passengers."lastName" ILIKE $${values.length})`;
  }

  query += ` ORDER BY travels DESC`;

  if (offset) {
    values.push(offset);
    query += ` OFFSET $${values.length}`;
  }

  if (limit) {
    values.push(limit);
    query += ` LIMIT $${values.length}`;
  }

  const result = await db.query(query, values);
  const passengersTravels = result.rows.map((row) => {
    return { passenger: `${row.firstName + " " + row.lastName}`, travels: Number(row.travels) };
  });
  return passengersTravels;
}

const passengersRepository = {
  createPassenger,
  getPassengerById,
  getPassengersTravels,
};

export default passengersRepository;
