import cloudinary from "cloudinary";
import { Excersice } from "../../../DB/models/exercise.model.js";

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
  if (!req.files || !req.files.img || !req.files.video) {
    return res.status(400).json("Image and video files are required");
  }
  try {
    const image = await cloudinary.uploader.upload(req.files.img[0].path);
    const video = await cloudinary.v2.uploader.upload(req.files.video[0].path, {
      resource_type: "video",
    });
    const category = req.body.category.includes(",")
      ? req.body.category.split(",")
      : [req.body.category];
      const instructions = req.body.instructions.includes(",")
        ? req.body.instructions.split(",")
        : [req.body.instructions];
    const meal = await Excersice.create({
      ...req.body,
      category,
      instructions,
      img: image.secure_url,
      video: video.secure_url,
    });
    res.status(201).json(meal);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Error uploading image or video", error: err.message });
  }
};

