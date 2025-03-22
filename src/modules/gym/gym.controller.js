import { Gym } from "../../../DB/models/Gym.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
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
      const gym = await User.create(req.body);
      res.status(201).json(gym);
    }
};
export const getGym = async (req, res, next) => {
  const gym = await Gym.findOne({ email: req.body.email });
  if (!gym) {
    res.status(404).json("Email not found");
  } else {
        bcrypt.compare(req.body.password, gym.password, (err, result) => {
          if (err) {
            return;
          }
    if (!result) {
      res.status(401).json("Wrong password");
    } else {
      res.status(200).json(gym);
    }
  })
}
};