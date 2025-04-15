import { Coach } from "../../../DB/models/coach.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import cloudinary from "cloudinary";

export const getAllCoach = async (req, res, next) => {
  const limit = req.body.limit ? req.body.limit : null;
  const coachs = await Coach.find({ verified: true })
    .limit(limit)
    .select("firstName profileImg");
  res.status(200).json(coachs);
};

export const addCoach = async (req, res, next) => {
  const coach = await Coach.findOne({ email: req.body.email });
  if (coach) {
    res.status(400).json("User already exists");
  } else {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const coach = await Coach.create({
        ...req.body,
        profileImg: image.secure_url,
      });
      const { password, ...other } = coach._doc;
      res.status(201).json({ ...other });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err.message });
    }
  }
};
export const addCoachWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const coach = await Coach.findOne({ email: decoded.email });
  if (coach) {
    res.status(400).json("Coach With this email already exists");
  } else {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const coach = await Coach.create({
        email: decoded.email,
        name: decoded.given_name,
        ...req.body,
        profileImg: image.secure_url,
      });
      res.status(201).json(coach);
    }catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err.message });
    }
  }
};
