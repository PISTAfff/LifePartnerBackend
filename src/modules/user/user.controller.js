import { User } from "../../../DB/models/user.model.js";
export const getAllUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
};
export const addUser = async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json("User not found");
    }else{
      if(user.password !== req.body.password){
        res.status(401).json("Wrong password");
      }else{
        res.status(200).json(user);
      }
    }
  } catch (error) {
    next(error);
  }
};
