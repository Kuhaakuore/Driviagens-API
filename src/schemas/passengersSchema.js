import joi from "joi";

export const passengerSchema = joi.object({
  firstName: joi.string().min(2).max(100).trim().required(),
  lastName: joi.string().min(2).max(100).trim().required(),
});
