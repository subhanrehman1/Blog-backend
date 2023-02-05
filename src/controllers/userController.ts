import express, { Request, Response } from "express";
import { statusCodes } from "../constants/statusCodes";
import { addUser } from "../services/userServices/addUser";
import { validateEmail } from "../services/userServices/validateEmail";
interface Body {
  name: string;
  email: string;
  token: string;
}
export const logInController = async (req: Request, res: Response) => {
  const body: Body = req.body;

  if (!body.name || !body.email) {
    return res
      .status(statusCodes.badRequest)
      .json({ success: "error", message: "please enter name and email" });
  }
  if (!validateEmail(body.email)) {
    return res
      .status(statusCodes.badRequest)
      .json({ success: "error", message: "invalid email" });
  }
  const token: any = await addUser(body);
  if (token) {
    return res
      // .cookie("token", token, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000,
      // })
      .status(statusCodes.created)
      .json({ success: true, message: "created",token:token });
  } else {
    return res
      .status(statusCodes.badRequest)
      .json({ success: "error", error: "Couldnot create user" });
  }
};

export const logOutController = async (req: Request, res: Response) => {
  
  // return res
  //   // .clearCookie("token")
  //   .status(statusCodes.created)
  //   .json({ success: true, message: "Logged out successfully" });
};
