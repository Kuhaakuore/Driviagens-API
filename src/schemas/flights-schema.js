import joi from "joi";
import joiDate from "@joi/date";
const Joi = joi.extend(joiDate);

export const flightSchema = Joi.object({
  origin: Joi.number().integer().required(),
  destination: Joi.number().integer().required(),
  date: Joi.date().format("DD-MM-YYYY").required(),
});

export const flightDatesSchema = Joi.object({
  biggerDate: Joi.date().format("DD-MM-YYYY"),
  smallerDate: Joi.date().format("DD-MM-YYYY"),
});
