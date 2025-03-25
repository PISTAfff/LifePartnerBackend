import { Router } from "express";
import { asyncHandler } from "../../utils/asynchandler.js";
import { getAllshop, addShop,addShopWithGoogle } from "./shop.controller.js";
import { shopSchema, shopWithGoogleSchema } from "./shop.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
let shopRouter = Router();
shopRouter.get("/getAllshop", asyncHandler(getAllshop));
shopRouter.post("/addShop", validation(shopSchema), asyncHandler(addShop));
shopRouter.post(
  "/addShopWithGoogle",
  validation(shopWithGoogleSchema),
  asyncHandler(addShopWithGoogle)
);
export default shopRouter;
