import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { getAllStories, addStory, deleteStory } from "./story.controller.js";
import { StorySchema } from "./story.schema.js";
import Joi from "joi";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
let storyRouter = Router();
storyRouter.post(
  "/deleteStory",
  validation(
    Joi.object({
      id: Joi.string().required(),
    })
  ),
  asyncHandler(deleteStory)
);
storyRouter.get("/getAllStories", asyncHandler(getAllStories));
storyRouter.post(
  "/addStory",
  upload.single("media"),
  validation(StorySchema),
  asyncHandler(addStory)
);

export default storyRouter;
