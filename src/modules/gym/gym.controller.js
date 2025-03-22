import { Gym } from "../../../DB/models/user.model.js";
export const getAllGyms = async (req, res, next) => {
  const Gyms = await Gym.find({});
  res.status(200).json(Gyms);
};

export const addGym = async (req, res, next) => {
    const gym = await Gym.findOne({ email: req.body.email });
    if (gym) {
      res.status(400).json("User already exists");
    } else {
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
};
export const getGym = async (req, res, next) => {
  const gym = await Gym.findOne({ email: req.body.email });
  if (!gym) {
    res.status(404).json("Email not found");
  } else {
    if (gym.password !== req.body.password) {
      res.status(401).json("Wrong password");
    } else {
      res.status(200).json(gym);
    }
  }
};