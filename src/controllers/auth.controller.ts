import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth.service";
import prisma from "../config/prismaClient";

const register = async (req: Request, res: Response) => {
  const responseUser = await registerNewUser(req.body);
  res.send(responseUser);
};

const login = async (req: Request, res: Response) => {
  const responseUser = await loginUser(req.body);
  if (responseUser !== "NOT_FOUND_USER" && "INCORRECT_PASSWORD") {
    res.cookie("USER-AUTH", responseUser, { sameSite: "lax", httpOnly: true });
    res.setHeader("authorization", `Bearer ${responseUser}`);
    res.send("INGRESO EXITOSO");
  }
};

const logout = async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      sessionToken: req.cookies["USER-AUTH"],
    },
  });
  if (user) {
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        sessionToken: "null",
      },
    });
    res.clearCookie("USER-AUTH");
  }
};

export { register, login, logout };
