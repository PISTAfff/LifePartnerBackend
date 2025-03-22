import { Coash } from "../../../DB/models/coash.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
export const getAllCoash = async (req, res, next) => {
  const coashs = await Coash.find({});
  res.status(200).json(coashs);
};

export const addCoash = async (req, res, next) => {
    const coash = await Coash.findOne({ email: req.body.email });
    if (coash) {
      res.status(400).json("User already exists");
    } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
      const coash = await Coash.create(req.body);
      res.status(201).json(coash);
    }
};
export const getCoash = async (req, res, next) => {
  const coash = await Coash.findOne({ email: req.body.email });
  if (!coash) {
    res.status(404).json("Email not found");
  } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return;
          }
    if (gym.password !== req.body.password) {
      res.status(401).json("Wrong password");
    } else {
      res.status(200).json(coash);
    }
  })
}
};