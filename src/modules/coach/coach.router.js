import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllCoach, addCoach,addCoachWithGoogle } from "./coach.controller.js";
import { coachSchema, coachSchemaWithGoogle } from "./coach.schema.js";
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
let coachRouter = Router();
coachRouter.post("/getAllCoaches", asyncHandler(getAllCoach));
coachRouter.post(
  "/addCoach",
  upload.single("profileImg"),
  validation(coachSchema),
  asyncHandler(addCoach)
);
coachRouter.post(
  "/addCoachWithGoogle",
  upload.single("profileImg"),
  validation(coachSchemaWithGoogle),
  asyncHandler(addCoachWithGoogle)
);
export default coachRouter;
