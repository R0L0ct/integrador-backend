import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  const responseUser = await registerNewUser(req.body);
  res.send(responseUser);
};

const login = async (req: Request, res: Response) => {
  const responseUser = await loginUser(req.body);
  res.cookie("USER-AUTH", responseUser, { sameSite: "lax", httpOnly: true });
  res.setHeader("authorization", `Bearer ${responseUser}`);
  res.send("INGRESO EXITOSO");
};

export { register, login };
