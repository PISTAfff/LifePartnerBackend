// import { Router } from "express";
// import { asyncHandler } from "../../utils/asynchandler.js";
// import { validation } from "../../middleware/validation.middleware.js";
// let FileName+Router = Router();
// export default FileName+Router;
import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { validation } from "../../middleware/validation.middleware.js";



import { createUser,getUserByName } from "./userNew.controller.js";

import { createUserSchema,getUserByNameSchema } from "./userNew.schema.js";
let userNewRouter = Router(); 

userNewRouter.post(
  "/createUser",
  validation(createUserSchema),
  asyncHandler(createUser)
);

userNewRouter.get(
  "/getUserByName",
  validation(getUserByNameSchema),
  asyncHandler(getUserByName)
);
export default userNewRouter;