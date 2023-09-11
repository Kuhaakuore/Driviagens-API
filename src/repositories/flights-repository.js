import dayjs from "dayjs";
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

async function getFlights(
  originId,
  destinationId,
  smallerDate,
  biggerDate,
  offset,
  limit
) {
  let query = `SELECT flights.id, origin.name AS origin, destination.name AS destination, date
                FROM flights
                JOIN cities AS origin ON flights.origin = origin.id
                JOIN cities AS destination ON flights.destination = destination.id 
                WHERE 1=1 `;
  const values = [];

  if (originId) {
    values.push(originId);
    query += ` AND origin = $${values.length}`;
  }

  if (destinationId) {
    values.push(destinationId);
    query += ` AND destination = $${values.length}`;
  }

  if (smallerDate && biggerDate) {
    values.push(smallerDate);
    values.push(biggerDate);
    query += ` AND date <= $${values.length - 1} AND date >= $${values.length}`;
  }

  query += ` ORDER BY date ASC`;

  if (offset) {
    values.push(offset);
    query += ` OFFSET $${values.length}`;
  }

  if (limit) {
    values.push(limit);
    query += ` LIMIT $${values.length}`;
  }

  const result = await db.query(query, values);
  const flights = result.rows.map((flight) => {
    return { ...flight, date: dayjs(flight.date).format("DD-MM-YYYY") };
  });
  return flights;
}

const flightsRepository = { createFlight, getFlightById, getFlights };

export default flightsRepository;
