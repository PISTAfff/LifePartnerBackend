import nodemailer from "nodemailer";
import { User } from "../../../DB/models/user.model.js";
export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};

export const addUser = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json("User already exists");
    } else {
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
};
export const getUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json("Email not found");
  } else {
    if (user.password !== req.body.password) {
      res.status(401).json("Wrong password");
    } else {
      res.status(200).json(user);
    }
  }
};
export const sendCode = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  sendEmail(user.email, "Verfication Code", "This is A Test");
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
