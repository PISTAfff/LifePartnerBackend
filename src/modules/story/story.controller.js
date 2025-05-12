import cloudinary from "cloudinary";
import { Story } from "../../../DB/models/story.model.js";
import cron from "node-cron";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllStories = async (req, res, next) => {
  const now = new Date();
  const stories = await Story.find({ expiresAt: { $gt: now } });
  res.status(200).json(stories);
};

export const addStory = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json("Media file is required");
  }
  try {
    const media = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); 
    const story = await Story.create({
      userId: req.user?._id || req.body.userId, 
      mediaUrl: media.secure_url,
      mediaType: req.body.mediaType,
      createdAt: new Date(),
      expiresAt,
    });
    res.status(201).json(story);
  } catch (err) {
    return res.status(500).json({ message: "Error uploading media", error: err.message });
  }
};

export const deleteStory = async (req, res, next) => {
  const { id } = req.body;
  try {
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json("Story not found");
    }
    res.status(200).json("Story deleted successfully");
  } catch (err) {
    return res.status(500).json({ message: "Error deleting story", error: err.message });
  }
};

cron.schedule("0 * * * *", async () => { 
  const now = new Date();
  const expiredStories = await Story.find({ expiresAt: { $lt: now } });
  for (const story of expiredStories) {
    // Optional: Delete from Cloudinary
    const publicId = story.mediaUrl.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
    } catch (e) {
      // Handle error or log
    }
    await Story.findByIdAndDelete(story._id);
  }
  console.log(`Cleaned up ${expiredStories.length} expired stories`);
});
