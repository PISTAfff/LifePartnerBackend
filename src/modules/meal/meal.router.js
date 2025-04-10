import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import { getAllMeals, addMeal, deleteMealByName } from "./meal.controller.js";
import { MealSchema } from "./meal.schema.js";
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
let mealRouter = Router();
mealRouter.post(
  "/deleteMeal",
  validation(
    Joi.object({
      name: Joi.string().min(1).max(50).required(),
    })
  ),
  asyncHandler(deleteMealByName)
);
mealRouter.get("/getAllMeals", asyncHandler(getAllMeals));
mealRouter.post(
  "/addMeal",
  upload.single("img"),
  validation(MealSchema),
  asyncHandler(addMeal)
);

export default mealRouter;
