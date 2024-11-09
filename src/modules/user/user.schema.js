import Joi from "joi";
export const UserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).required(),
  password: Joi.string().min(6).max(30).required(),
});
