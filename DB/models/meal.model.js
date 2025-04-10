import { Schema, model } from "mongoose";

const MealSchema = new Schema({
  name: String,
  description: String,
  img: String,
  category: [String],
  howTo: String,
  protein: Number,
  carbs: Number,
  fats: Number,
  calories: Number,
});

export const Meal = model("Meal", MealSchema);
