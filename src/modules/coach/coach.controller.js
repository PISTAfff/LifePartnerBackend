import { Coach } from "../../../DB/models/coach.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
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
      const token = null
      const {password , ...other} = coach._doc;
      res.status(201).json({ ...other, token});
    }
};
export const getCoach = async (req, res, next) => {
  const coach = await Coach.findOne({ email: req.body.email });
  if (!coach) {
    res.status(404).json("Email not found");
  } else {
        bcrypt.compare(req.body.password, coach.password, (err, result) => {
          if (err) {
            return;
          }
    if (!result) {
      res.status(401).json("Wrong password");
    } else {
      const token  = null ;
      const {password, ...other} = coach._doc;
      res.status(200).json({ ...other, token});
    }
  })
}
};