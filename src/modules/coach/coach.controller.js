import { Coach } from "../../../DB/models/coach.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

export const getAllCoach = async (req, res, next) => {
  const coachs = await Coach.find({});
  res.status(200).json(coachs);
};

export const addCoach = async (req, res, next) => {
  const coach = await Coach.findOne({ email: req.body.email });
  if (coach) {
    res.status(400).json("User already exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const coach = await Coach.create(req.body);
    const token = null;
    const { password, ...other } = coach._doc;
    res.status(201).json({ ...other, token });
  }
};
export const addCoachWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const coach = await Coach.findOne({ email: decoded.email });
  if (coach) {
    res.status(400).json("Coach With this email already exists");
  } else {
    const coach = await Coach.create({
      email: decoded.email,
      name:decoded.given_name,
      ...req.body,
    });
    res.status(201).json(coach);
  }
};
