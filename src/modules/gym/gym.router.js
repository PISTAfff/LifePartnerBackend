import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import {
  getAllGyms,
  addGym,
  addGymWithGoogle,
} from "./gym.controller.js";
import { GymSchema, GymSchemaWithGoogle } from "./gym.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let gymRouter = Router();
gymRouter.get("/getAllGyms", asyncHandler(getAllGyms));
gymRouter.post("/addGym", validation(GymSchema), asyncHandler(addGym));
gymRouter.post(
  "/addGymWithGoogle",
  validation(GymSchemaWithGoogle),
  asyncHandler(addGymWithGoogle)
);
export default gymRouter;
