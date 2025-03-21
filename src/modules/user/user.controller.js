import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

export const addUser = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const user = await User.create(req.body);
      res.status(201).json(user);
    }

};
export const getUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json("Email not found");
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return;
      }
       if (!result) {
         res.status(401).json("Wrong password");
       } else {
         res.status(200).json(user);
       }
    });
  }
};
export const sendCode = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  sendEmail(user.email, "Verfication Code", "This is A Test2");
  res.status(200).json(user);
};
async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lifepartnerservicenctu@gmail.com",
      pass: "sjnd bpwc xpjc xuyx",
    },
  });

  let mailOptions = {
    from: "lifepartnerservicenctu@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

}
