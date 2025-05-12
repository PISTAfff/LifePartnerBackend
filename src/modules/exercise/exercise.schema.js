import Joi from "joi";

export const ExerciseSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  category: Joi.string().min(1).required(),
  howTo: Joi.string().min(1).required(),
  mediaUrl: Joi.string().uri().required(),
  mediaType: Joi.string().valid("image", "video").required(),

}); 