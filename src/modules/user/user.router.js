import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import {
  getAllUsers,
  addUser,
  addUserWithGoogle,
} from "./user.controller.js";
import {
  UserSchema,
  UserSchemaToken,
} from "./user.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
let userRouter = Router();
userRouter.get("/getAllUsers", asyncHandler(getAllUsers));
userRouter.post(
  "/createUser",
  upload.single("profileImg"),
  validation(UserSchema),
  asyncHandler(addUser)
);
userRouter.post(
  "/createUserWithGoogle",
  upload.single("profileImg"),
  validation(UserSchemaToken),
  asyncHandler(addUserWithGoogle)
);
export default userRouter;
