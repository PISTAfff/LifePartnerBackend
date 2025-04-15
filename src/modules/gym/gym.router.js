import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  getAllGyms,
  addGym,
  addGymWithGoogle,
} from "./gym.controller.js";
import { GymSchema, GymSchemaWithGoogle } from "./gym.schema.js";
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
let gymRouter = Router();
gymRouter.post("/getAllGyms", asyncHandler(getAllGyms));
gymRouter.post(
  "/addGym",
  upload.single("profileImg"),
  validation(GymSchema),
  asyncHandler(addGym)
);
gymRouter.post(
  "/addGymWithGoogle",
  upload.single("profileImg"),
  validation(GymSchemaWithGoogle),
  asyncHandler(addGymWithGoogle)
);
export default gymRouter;
