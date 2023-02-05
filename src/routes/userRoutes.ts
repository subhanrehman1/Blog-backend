import express from "express";
import { auth } from "../middlewares/auth";
import { logInController,logOutController } from "../controllers/userController";
const userRouter = express.Router();
userRouter.post(`/login`,logInController);
userRouter.post(`/logout`,auth,logOutController);
export default userRouter;
