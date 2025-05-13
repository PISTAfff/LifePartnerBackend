import Joi from "joi";
export const ExcersiceSchema = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string().required(),
  instructions: Joi.string().required(),
  desc: Joi.string().min(1).required(),
  proTip: Joi.string().min(1).required(),
});
