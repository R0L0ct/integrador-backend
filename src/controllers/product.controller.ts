import prisma from "../config/prismaClient";
import { Request, Response } from "express";

const createNewProduct = async (req: Request, res: Response) => {
  const createProduct = await prisma.product.create({
    data: req.body,
  });
  res.json(createProduct);
};

const getAllProducts = async (req: Request, res: Response) => {
  const getProducts = await prisma.product.findMany();
  res.json(getProducts);
};

const getProduct = async (req: Request, res: Response) => {
  const getProduct = await prisma.product.findFirst({
    where: {
      id: req.params.id,
    },
    include: {
      category: true,
    },
  });
  res.json(getProduct);
};

export { createNewProduct, getAllProducts, getProduct };
