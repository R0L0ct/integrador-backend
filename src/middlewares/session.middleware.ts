import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";
import prisma from "config/prismaClient";

interface RequestExt extends Request {
  user?: string | JwtPayload;
}

const checkSession = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers["authorization"] || "";
    const jwt = jwtByUser.split(" ").pop();
    const cookieToken = req.cookies["USER-AUTH"] || "";
    if (jwt.toString() !== cookieToken.toString()) {
      res.send("JWT Y COOKIES NO COINCIDEN");
      return;
    }
    // const jwt = jwtByUser;
    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      res.status(400);
      res.send("NO_TIENES_UN_JWT_VALIDO");
      return;
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("SESION_NO_VALIDA");
  }
};

export { checkSession };
