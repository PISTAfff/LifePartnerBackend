import { Gym } from "../../../DB/models/Gym.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

export const getAllGyms = async (req, res, next) => {
  const Gyms = await Gym.find({});
  res.status(200).json(Gyms);
};

export const addGym = async (req, res, next) => {
  const gym = await Gym.findOne({ email: req.body.email });
  if (gym) {
    res.status(400).json("User already exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const gym = await Gym.create(req.body);
    const { password, ...other } = gym._doc;
    res.status(201).json(other);
  }
};
export const addGymWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const gym = await Gym.findOne({ email: decoded.email });
  if (gym) {
    res.status(400).json("Gym With this email already exists");
  } else {
    const gym = await Gym.create({
      email: decoded.email,
      ...req.body,
    });
    res.status(201).json(gym);
  }
};
