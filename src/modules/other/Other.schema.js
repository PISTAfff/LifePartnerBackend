import Joi from "joi";
export const emailExistsWithEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
export const emailExistsWithTokenSchema = Joi.object({
  token: Joi.string().required(),
});
export const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
