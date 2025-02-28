import Joi from "joi";
export const UserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
export const getUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
});
