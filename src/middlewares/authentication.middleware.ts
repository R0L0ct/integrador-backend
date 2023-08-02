import prisma from "../config/prismaClient";
import { Request, Response, NextFunction } from "express";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["USER-AUTH"];
    if (!sessionToken) {
      res.sendStatus(403);
    }
    const getUserBySessionToken = await prisma.user.findFirst({
      where: {
        sessionToken: sessionToken,
      },
    });

    if (!getUserBySessionToken) {
      res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export { isAuthenticated };
