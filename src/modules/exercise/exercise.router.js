import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { getAllExercises, addExercise, deleteExerciseByTitle } from "./exercise.controller.js";
import { ExerciseSchema } from "./exercise.schema.js";
import Joi from "joi";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
});

let exerciseRouter = Router();

exerciseRouter.post(
  "/deleteExercise",
  validation(
    Joi.object({
      title: Joi.string().min(1).max(50).required(),
    })
  ),
  asyncHandler(deleteExerciseByTitle)
);

exerciseRouter.get("/getAllExercises", asyncHandler(getAllExercises));

exerciseRouter.post(
  "/addExercise",
  upload.single("media"),
  asyncHandler(addExercise)
);

export default exerciseRouter;
