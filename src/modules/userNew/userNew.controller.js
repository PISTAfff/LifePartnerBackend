import { UserNew } from "../../../DB/models/userNew.model.js";
export const createUser = async (req, res, next) => {
  try {
    const userFound = await UserNew.findOne({ username: req.body.username });
    if (userFound)
      return res.json({ success: false, message: "Username already exists" });
    const user = await UserNew.create({
      username: req.body.username,
      password: req.body.password,
      Email: req.body.Email,
      isMale: req.body.isMale,
      age: req.body.age,
    });
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getUserByName = async (req, res, next) => {
  try {
    const user = await UserNew.findOne({ username: req.body.username });
    if (!user) return res.json({ success: false, message: "User not found" });
    res.json({ success: true, user: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
