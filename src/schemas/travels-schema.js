import joi from "joi";

export const travelSchema = joi.object({
  passengerId: joi.number().integer(),
  flightId: joi.number().integer(),
});