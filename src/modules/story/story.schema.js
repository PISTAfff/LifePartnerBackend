import Joi from "joi";

export const StorySchema = Joi.object({
  mediaType: Joi.string().valid("photo", "video").required(),
});
