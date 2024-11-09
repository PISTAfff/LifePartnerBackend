import { User } from "../../../DB/models/user.model.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
export const addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
