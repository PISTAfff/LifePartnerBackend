import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).max(100).required(),
  email: Joi.string().email().required(),
  isMale: Joi.boolean().required(),
  age: Joi.number().integer().min(18).required(),
});

export const getUserByNameSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
});
