import Joi from "joi";
export const MealSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  category: Joi.string().required(),
  howTo: Joi.string().required(),
  protein: Joi.number().required(),
  carbs: Joi.number().required(),
  fats: Joi.number().required(),
  calories: Joi.number().required(),
});
