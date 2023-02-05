import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getConfig } from "../config/config";
import { statusCodes } from "../constants/statusCodes";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  // let token = req?.cookies?.token;
  let token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    const data: any = verify(token, getConfig.secret);
    req.body.email = data?.result.email;
    req.body.name = data?.result.name;
    next();
  } else {
    res.status(statusCodes.unAuthorized).json({
      success: "error",
      message: "access denied unauthorized user",
    });
    return;
  }
};
