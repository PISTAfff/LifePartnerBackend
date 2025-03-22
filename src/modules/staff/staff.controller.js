import { Staff } from "../../../DB/models/staff.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
export const getAllstaff = async (req, res, next) => {
  const staffs = await Staff.find({});
  res.status(200).json(staffs);
};

export const addstaff = async (req, res, next) => {
    const staff = await Staff.findOne({ email: req.body.email });
    if (staff) {
      res.status(400).json("User already exists");
    } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
      const staff = await User.create(req.body);
      res.status(201).json(staff);
    }
};
export const getstaff = async (req, res, next) => {
  const staff = await Staff.findOne({ email: req.body.email });
  if (!staff) {
    res.status(404).json("Email not found");
  } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return;
          }
    if (gym.password !== req.body.password) {
      res.status(401).json("Wrong password");
    } else {
      res.status(200).json(staff);
    }
  })
}
};