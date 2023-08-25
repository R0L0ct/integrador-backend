import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth.service";
import prisma from "../config/prismaClient";
import { generateToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";

interface RequestExt extends Request {
  uid?: string | JwtPayload;
  urole?: string | JwtPayload;
}
const register = async (req: Request, res: Response) => {
  const responseUser = await registerNewUser(req.body);
  res.send(responseUser);
};

const login = async (req: Request, res: Response) => {
  const responseUser = await loginUser(req.body);
  if (
    responseUser === "NOT_FOUND_USER" ||
    responseUser === "INCORRECT_PASSWORD"
  ) {
    return res.json(responseUser);
  } else {
    const jwt = responseUser.token.jwt;

    res.cookie("refreshToken", jwt, {
      sameSite: "lax",
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });
    res.json(responseUser);
  }
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ logout: true });
};

const refreshToken = async (req: RequestExt, res: Response) => {
  try {
    const token = generateToken(req.uid as string, req.urole as string);
    const getUser = await prisma.user.findFirst({
      where: {
        id: req.uid as string,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const user = {
      id: getUser.id,
      name: getUser.name,
    };
    res.cookie("refreshToken", token.jwt, {
      sameSite: "lax",
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    });
    res.json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export { register, login, logout, refreshToken };
