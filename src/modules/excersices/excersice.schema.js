import Joi from "joi";
export const ExcersiceSchema = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string().required(),
  howTo: Joi.string().required(),
});
