import cloudinary from "cloudinary";
import { Excersice } from "../../../DB/models/Excersice.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllExcersises = async (req, res, next) => {
  const Excersices = await Excersice.find({});
  res.status(200).json(Excersices);
};
export const deleteExcersiceByName = async (req, res, next) => {
  const { name } = req.body;
  try {
    const meal = await Excersice.findOneAndDelete({ name });
    if (!meal) {
      return res.status(404).json("Excersice not found");
    }
    res.status(200).json("Excersice deleted successfully");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting meal", error: err.message });
  }
};

export const addExcersice = async (req, res, next) => {
  const existingExcersice = await Excersice.findOne({ name: req.body.name });
  if (existingExcersice) {
    return res.status(400).json("Excersice with this name already exists");
  }
  if (!req.file) {
    return res.status(400).json("Image file is required");
  }
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const category = req.body.category.includes(",")
      ? req.body.category.split(",")
      : [req.body.category];
    const meal = await Excersice.create({
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
