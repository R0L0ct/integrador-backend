import prisma from "../config/prismaClient";
import { Request, Response } from "express";

const createNewProduct = async (req: Request, res: Response) => {
  const createProduct = await prisma.product.create({
    data: req.body,
  });
  return res.json(createProduct);
};

const getAllProducts = async (_req: Request, res: Response) => {
  const getProducts = await prisma.product.findMany({
    include: {
      category: true,
      inventoryItems: true,
    },
  });
  return res.json(getProducts);
};

const getProduct = async (req: Request, res: Response) => {
  const getProduct = await prisma.product.findFirst({
    where: {
      id: req.params.id,
    },
    include: {
      category: true,
      inventoryItems: true,
    },
  });
  return res.json(getProduct);
};

const updateProduct = async (req: Request, res: Response) => {
  const updateProduct = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  return res.json(updateProduct);
};

const deleteProduct = async (req: Request, res: Response) => {
  const deleteProduct = await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deleteProduct);
};

// Inventory

const getAllInventory = async (req: Request, res: Response) => {
  const getInventory = await prisma.inventoryItems.findMany();
  return res.json(getInventory);
};

const createInventoryItem = async (req: Request, res: Response) => {
  const createItem = await prisma.inventoryItems.create({
    data: req.body,
  });

  const getInventoryStock = await prisma.inventoryItems.findMany({
    where: {
      productId: createItem.productId,
    },
    select: {
      stock: true,
    },
  });

  let totalStock = 0;

  getInventoryStock.forEach((item) => {
    totalStock += item.stock;
  });

  await prisma.product.update({
    where: {
      id: createItem.productId,
    },
    data: {
      stock: totalStock,
    },
  });

  return res.json(createItem);
};

const updateInventoryItem = async (req: Request, res: Response) => {
  const updateItem = await prisma.inventoryItems.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  const getInventoryStock = await prisma.inventoryItems.findMany({
    where: {
      productId: updateItem.productId,
    },
    select: {
      stock: true,
    },
  });

  let totalStock = 0;

  getInventoryStock.forEach((item) => {
    totalStock += item.stock;
  });

  await prisma.product.update({
    where: {
      id: updateItem.productId,
    },
    data: {
      stock: totalStock,
    },
  });

  return res.json(updateItem);
};

const deleteInventoryItem = async (req: Request, res: Response) => {
  const deleteItem = await prisma.inventoryItems.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.json(deleteItem);
};

export {
  createNewProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  deleteProduct,
  getAllInventory,
};
