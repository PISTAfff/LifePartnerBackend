import { Shop } from "../../../DB/models/Shop.model.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import cloudinary from "cloudinary";

export const getAllshop = async (req, res, next) => {
  const shops = await Shop.find({});
  res.status(200).json(shops);
};

export const addShop = async (req, res, next) => {
  const shop = await Shop.findOne({ email: req.body.email });
  if (shop) {
    res.status(400).json("User already exists");
  } else {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const shop = await Shop.create({...req.body,profileImg:image.secure_url});
      const { password, ...other } = shop._doc;
      res.status(201).json({ ...other });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err.message });
    }
  }
};
export const addShopWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const shop = await Shop.findOne({ email: decoded.email });
  if (shop) {
    res.status(400).json("Shop With this email already exists");
  } else {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const shop = await Shop.create({
        email: decoded.email,
        ...req.body,
        profileImg: image.secure_url,
      });
      res.status(201).json(shop);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err.message });
    }
  }
};
