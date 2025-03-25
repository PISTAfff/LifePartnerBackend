import Joi from "joi";
export const EmailandPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
export const EmailSchema = Joi.object({
  email: Joi.string().email().required()
});