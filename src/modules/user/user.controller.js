import dotenv from "dotenv";
dotenv.config();
import { User } from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
import cloudinary from "cloudinary";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};
export const addUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json("User already exists");
  } else {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({...req.body,profileImg:image.secure_url});
      const { password, ...other } = user._doc;
      res.status(201).json({...other });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err.message });
    }
  }
};
export const addUserWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const currentUserData = {
    firstName: decoded.given_name.includes(" ")
      ? decoded.given_name.split(" ")[0]
      : decoded.given_name,
    lastName: decoded.given_name.includes(" ")
      ? decoded.given_name.split(" ")[1]
      : "",
    email: decoded.email,
    ...req.body,
  };
  const user = await User.findOne({ email: currentUserData.email });
  if (user) {
    res.status(400).json("User With this email already exists");
  } else {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      currentUserData.profileImg = image.secure_url;
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error uploading image", error: err.message });
    }
    const user = await User.create(currentUserData);
    res.status(201).json(user);
  }
};
