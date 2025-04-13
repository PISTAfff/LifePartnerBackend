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
export const checkCode = async (req, res, next) => {
  let record;
  const models = [Gym, User, Shop, Coach];
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
  if (record.code === req.body.code) {
    record.code = "";
    await record.save();
    res.status(200).json("Verified");
  } else {
    res.status(200).json("Invalid Code");
  }
}
export const sendCode = async (req, res, next) => {
  let record;
  const models = [Gym, User, Shop, Coach];
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
  if (record.password != null) {
    const otp = Math.random().toString(36).substring(2, 8).toUpperCase();
    record.code = otp;
    await record.save();
    sendEmail(record.email, "Verfication Code", otp);
    res.status(200).json("Code Sent");
  } else {
    res.status(400).json("Cant Send Code To That email");
  }
};
async function sendEmail(to, subject, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "GymmifyNCTU@gmail.com",
      pass: "sjnd bpwc xpjc xuyx",
    },
  });

  let mailOptions = {
    from: "GymmifyNCTU@gmail.com",
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
  const models = [
    ["gym", Gym],
    ["user", User],
    ["shop", Shop],
    ["coach", Coach],
  ];

  for (let model of models) {
    const record = await model[1].findOne({ email: req.body.email });
    if (record) {
      bcrypt.compare(req.body.password, record.password, (err, result) => {
        if (err) {
          return next(err);
        }
        if (!result) {
          return res.status(401).json("Wrong password");
        } else {
          if (model[0] === "user") {
            const { code, password, ...other } = record._doc;
            return res.status(200).json({ userType: model[0], ...other });
          } else {
            const { code, password, ...other } = record._doc;
            if (other.verified) {
              return res.status(200).json({ userType: model[0], ...other });
            } else {
              return res.status(401).json("Account not verified");
            }
          }
        }
      });
      return;
    }
  }
  return res.status(404).json("Email not found");
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
      if(model[0] === "user"){
        const { code, password, ...other } = record._doc;
        res.status(200).json({ userType: model[0], ...other });
      } else {
        const { code, password, ...other } = record._doc;
        if (other.verified) {
          res.status(200).json({ userType: model[0], ...other });
        } else {
          res.status(401).json("Account not verified");
        }
      }
      return;
    }
  }
  res.status(404).json("Email not found");
};
export const verifyAccount = async (req, res, next) => {
  let record;
  const models = [Gym, Shop, Coach];
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
    record.verified = true;
    await record.save();
    res.status(200).json("Account Verified");

};
export const getAllUnverifiedEmails = async (req, res, next) => {
  const models = [
    ["gym", Gym],
    ["user", User],
    ["shop", Shop],
    ["coach", Coach],
  ];
  let emails = [];
  for (let model of models) {  
    const records = await model[1].find({ verified: false }, { password: 0, code: 0 });
    for (let record of records) {
      emails.push([
        record.email,
        model[0],
        record.toObject({ getters: true }),
      ]);
    }
  }
  res.status(200).json(emails);
}
export const deleteAccount = async (req, res, next) => {
  const models = [Gym, User, Shop, Coach];
  let record;
  for (let model of models) {
    record = await model.findOneAndDelete({ email: req.body.email });
    if (record) {
      break;
    }
  }
  if (!record) {
    res.status(404).json("Email not found");
    return;
  }
  res.status(200).json("Account Deleted");
};

export const loginAdmin = async (req, res, next) => {
  const username = "admin";
  const password = "admin";
  if (req.body.username !== username || req.body.password !== password) {
    res.status(401).json("Wrong username or password");
    return;
  }
  res.status(200).json("Admin logged in");
};
