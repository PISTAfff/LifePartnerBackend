import Joi from "joi";

export const GymSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  address: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(11).max(11).required(),
  email: Joi.string().email().required(),
  workingHours: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
export const GymSchemaWithGoogle = Joi.object({
  name: Joi.string().min(1).max(50).required(),

  address: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(11).max(11).required(),
  workingHours: Joi.string().required(),
});
export const getGymSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
