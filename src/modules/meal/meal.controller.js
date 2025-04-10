import cloudinary from "cloudinary";
import { Meal } from "../../../DB/models/meal.model.js";

// Cloudinary config (set up with your Cloudinary credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllMeals = async (req, res, next) => {
  const meals = await Meal.find({});
  res.status(200).json(meals);
};

export const addMeal = async (req, res, next) => {
  const existingMeal = await Meal.findOne({ name: req.body.name });
  if (existingMeal) {
    return res.status(400).json("Meal with this name already exists");
  }
  if (!req.file) {
    return res.status(400).json("Image file is required");
  }
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const category = req.body.category.includes(",")
      ? req.body.category.split(",")
      : [req.body.category];
    const meal = await Meal.create({
      ...req.body,
      category,
      img: image.secure_url,
    });
    res.status(201).json(meal);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error uploading image", error: err.message });
  }
};
