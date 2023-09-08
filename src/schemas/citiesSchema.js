import joi from "joi";

export const citieSchema = joi.object({
  name: joi.string().min(2).max(50).trim().required(),
});
