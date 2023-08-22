import { verifyToken } from "../utils/jwt.handle";
import prisma from "../config/prismaClient";
import { Request, Response } from "express";
interface JwtPayload {
  id: string;
}
const getAllUsers = async (req: Request, res: Response) => {
  const getUsers = await prisma.user.findMany();
  return res.json(getUsers);
};

const getUser = async (req: Request, res: Response) => {
  const getUser = await prisma.user.findFirst({
    where: {
      id: req.params.id,
    },
  });
  return res.json(getUser);
};

const createUser = async (req: Request, res: Response) => {
  const createUser = await prisma.user.create({
    data: req.body,
  });
  return res.json(createUser);
};

const updateUser = async (req: Request, res: Response) => {
  const updateUsers = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  return res.json(updateUsers);
};

const deleteUser = async (req: Request, res: Response) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deleteUser);
};

const getUserBySessionToken = async (req: Request, res: Response) => {
  const token = req.cookies["refreshToken"];

  if (!token) {
    res.send("TOKEN NO VALIDO");
    return;
  }

  const { id } = verifyToken(token) as JwtPayload;

  const getUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return res.json(getUser);
};

export {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserBySessionToken,
};
