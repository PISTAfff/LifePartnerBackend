import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllCoach, addCoach,addCoachWithGoogle } from "./coach.controller.js";
import { coachSchema, coachSchemaWithGoogle } from "./coach.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let coachRouter = Router();
coachRouter.get("/getAllCoach", asyncHandler(getAllCoach));
coachRouter.post("/addCoach", validation(coachSchema), asyncHandler(addCoach));
coachRouter.post(
  "/addCoachWithGoogle",
  validation(coachSchemaWithGoogle),
  asyncHandler(addCoachWithGoogle)
);
export default coachRouter;
