import Joi from "joi";
export const EmailandPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
export const UserNameandPasswordSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).max(100).required(),
});
export const EmailSchema = Joi.object({
  email: Joi.string().email().required()
});
export const CodeSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required()
})