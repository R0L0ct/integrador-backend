import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";
import prisma from "config/prismaClient";

interface RequestExt extends Request {
  user?: string | JwtPayload;
  uid?: string | JwtPayload;
}
interface JWTPayload {
  id: string | JwtPayload;
}

const checkSession = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();

    if (!jwt) {
      res.send("TOKEN NO VALIDO");
      return;
    }
    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      res.status(400);
      res.send("NO_TIENES_UN_JWT_VALIDO");
      return;
    } else {
      req.user = isUser;
      console.log(isUser);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("SESION_NO_VALIDA");
  }
};

const refreshTokenMid = (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) throw new Error("No existe token");

    const { id } = verifyToken(refreshToken) as JWTPayload;
    req.uid = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
export { checkSession, refreshTokenMid };
