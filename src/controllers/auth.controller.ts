import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const responseUser = await registerNewUser(req.body);
  res.send(responseUser);
};

export const login = async (req: Request, res: Response) => {
  const responseUser = await loginUser(req.body);
  res.send(responseUser);
};
