import { Shop } from "../../../DB/models/Shop.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
export const getAllshop = async (req, res, next) => {
  const shops = await Shop.find({});
  res.status(200).json(shops);
};

export const addShop = async (req, res, next) => {
    const shop = await Shop.findOne({ email: req.body.email });
    if (shop) {
      res.status(400).json("User already exists");
    } else {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
      const shop = await Shop.create(req.body);
      const token = null
      const {password , ...other} = shop._doc;

      res.status(201).json({ ...other, token});
    }
};
export const getShop = async (req, res, next) => {
  const shop = await Shop.findOne({ email: req.body.email });
  if (!shop) {
    res.status(404).json("Email not found");
  } else {
        bcrypt.compare(req.body.password, shop.password, (err, result) => {
          if (err) {
            return;
          }
    if (!result) {
      res.status(401).json("Wrong password");
    } else {
      const token  = null ;
      const {password, ...other} = shop._doc;
      res.status(200).json({ ...other, token});
    }
  })
}
};