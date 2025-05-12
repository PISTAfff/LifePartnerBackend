import cloudinary from "cloudinary";
import { Exercise } from "../../../DB/models/exercise.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find({});
    console.log("Found exercises:", exercises);
    res.status(200).json(exercises);
  } catch (err) {
    console.error("Error getting exercises:", err);
    res.status(500).json({ message: "Error getting exercises", error: err.message });
  }
};

export const deleteExerciseByTitle = async (req, res, next) => {
  const { title } = req.body;
  try {
    console.log("Attempting to delete exercise with title:", title);
    const exercise = await Exercise.findOneAndDelete({ title });
    if (!exercise) {
      console.log("Exercise not found:", title);
      return res.status(404).json("Exercise not found");
    }
    console.log("Exercise deleted successfully:", title);
    res.status(200).json("Exercise deleted successfully");
  } catch (err) {
    console.error("Error deleting exercise:", err);
    return res.status(500).json({ message: "Error deleting exercise", error: err.message });
  }
};

export const addExercise = async (req, res, next) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const existingExercise = await Exercise.findOne({ title: req.body.title });
    if (existingExercise) {
      console.log("Exercise already exists:", req.body.title);
      return res.status(400).json("Exercise with this title already exists");
    }
    if (!req.file) {
      console.log("No media file provided");
      return res.status(400).json("Media file is required");
    }

    console.log("Uploading to Cloudinary...");
    const media = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload successful:", media.secure_url);

    const category = req.body.category.includes(",")
      ? req.body.category.split(",")
      : [req.body.category];
    
    console.log("Creating exercise with data:", {
      ...req.body,
      category,
      mediaUrl: media.secure_url,
      mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video'
    });

    const exercise = await Exercise.create({
      ...req.body,
      category,
      mediaUrl: media.secure_url,
      mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video'
    });
    console.log("Exercise created successfully:", exercise);
    res.status(201).json(exercise);
  } catch (err) {
    console.error("Error in addExercise:", err);
    return res
      .status(500)
      .json({ message: "Error uploading media", error: err.message });
  }
};
