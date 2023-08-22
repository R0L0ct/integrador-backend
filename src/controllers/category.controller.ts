import prisma from "../config/prismaClient";
import { Request, Response } from "express";

const createNewCategory = async (req: Request, res: Response) => {
  const createCategory = await prisma.category.create({
    data: req.body,
  });
  return res.json(createCategory);
};

const getAllCategories = async (_req: Request, res: Response) => {
  const getCategories = await prisma.category.findMany();
  return res.json(getCategories);
};

const getCategory = async (req: Request, res: Response) => {
  const getCategory = await prisma.category.findFirst({
    where: {
      id: req.params.id,
    },
    include: {
      product: true,
    },
  });
  return res.json(getCategory);
};

const updateCategory = async (req: Request, res: Response) => {
  const updateCategory = await prisma.category.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  return res.json(updateCategory);
};

const deleteCategory = async (req: Request, res: Response) => {
  const deleteCategory = await prisma.category.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deleteCategory);
};

export {
  createNewCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
