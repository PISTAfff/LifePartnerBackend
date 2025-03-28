import dotenv from "dotenv";
dotenv.config();
import { User } from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";
export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
};
export const addUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json("User already exists");
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return;
      }
       if (!result) {
         res.status(401).json("Wrong password");
       } else {
        const token  = null ;
        const {password, ...other} = user._doc;
         res.status(200).json({ ...other, token});
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
export const updateUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email} );
  if (!user) {
    res.status(404).json({message: error.details[0].message});
  }
  if (req.body.password) {m 
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create(req.body);
    res.status(201).json(user);
  }
};
export const addUserWithGoogle = async (req, res, next) => {
  const token = req.header("token");
  const decoded = jwtDecode(token);
  const currentUserData = {
    firstName: decoded.given_name.includes(" ") ?decoded.given_name.split(" ")[0]:decoded.given_name,
    lastName: decoded.given_name.includes(" ") ? decoded.given_name.split(" ")[1] : "",
    email: decoded.email,
    ...req.body,
  };
  const user = await User.findOne({ email: currentUserData.email });
  if (user) {
    res.status(400).json("User With this email already exists");
  } else {
    const user = await User.create(currentUserData);
    res.status(201).json(user);
  }
};