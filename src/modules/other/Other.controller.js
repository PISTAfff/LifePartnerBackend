import { Gym } from "../../../DB/models/Gym.model.js";
import { User } from "../../../DB/models/user.model.js";
import { Shop } from "../../../DB/models/Shop.model.js";
import { Coach } from "../../../DB/models/coach.model.js";
import { jwtDecode } from "jwt-decode";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const checkEmailInModels = async (req, res, next) => {
  const models = [Gym, User, Shop, Coach];
  for (let model of models) {
    const record = await model.findOne({ email: req.body.email });
    if (record) {
      res.status(200).json({ emailExists: true });
      return;
    }
  }
  res.status(200).json({ emailExists: false });
};

export const checkEmailFromToken = async (req, res, next) => {
  const token = req.headers["token"];
  const decoded = jwtDecode(token);
  const models = [Gym, User, Shop, Coach];
  for (let model of models) {
    const record = await model.findOne({ email: decoded.email });
    if (record) {
      res.status(200).json({ emailExists: true });
      return;
    }
  }
  res.status(200).json({ emailExists: false });
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
    text: `Your Verification Code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
export const login = async (req, res, next) => {
  const models = [["gym",Gym], ["user",User], ["shop",Shop], ["coach",Coach]];
  for (let model of models) {
    const record = await model[1].findOne({ email: req.body.email });
    if (record) {
     bcrypt.compare(req.body.password, record.password, (err, result) => {
       if (err) {
         return;
       }
       if (!result) {
         res.status(401).json("Wrong password");
       } else {
         const { password, ...other } = record._doc;
         res.status(200).json({userType: model[0],...other});
       }
     });
    }
  }
  res.status(404).json("Email not found");
};

export const loginWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const models = [
    ["gym", Gym],
    ["user", User],
    ["shop", Shop],
    ["coach", Coach],
  ];
  for (let model of models) {
        const record = await model[1].findOne({ email: decoded.email });
    if (record) {
      const { password, ...other } = record._doc;
         res.status(200).json({ userType: model[0], ...other });
      return;
    }
  }
  res.status(404).json("Email not found");
};
