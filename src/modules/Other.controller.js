import { Gym } from "../../DB/models/Gym.model";
import { User } from "../../DB/models/user.model";
import { Shop } from "../../DB/models/Shop.model";
import { Coach } from "../../DB/models/coach.js";
import jwtDecode from "jwt-decode";

export const checkEmailInModels = async (req, res, next) => {
  const models = [Gym, User, Shop, Coach];
  for (let model of models) {
    const record = await model.findOne({ email: req.body.email });
    if (record) {
      res.status(400).json("email already exists");
      return;
    }
  }
  res.status(200).json("Email is not in use");
};
export const checkEmailFromToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json("No token provided");
    return;
  }
  const decoded = jwtDecode(token);
  const models = [Gym, User, Shop, Coach];
  for (let model of models) {
    const record = await model.findOne({ email: decoded.email });
    if (record) {
      res.status(400).json("email already exists");
      return;
    }
  }
  res.status(200).json("Email is not in use");
};
export const changePassword = async (req, res, next) => {
  const models = [Gym, User, Shop, Coach];
  let record;
  for (let model of models) {
    record = await model.findOne({ email: req.body.email });
    if (record) {
      break;
    }
  }
  if (!record) {
    res.status(404).json("Email not found");
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  record.password = password;
  await record.save();
  res.status(200).json("Password Changed");
};

