import prisma from "../config/prismaClient";
import { Request, Response } from "express";

const createNewCustomer = async (req: Request, res: Response) => {
  const createCustomer = await prisma.customer.create({
    data: req.body,
    include: {
      user: true,
    },
  });
  res.json(createCustomer);
};

const getAllCustomers = async (req: Request, res: Response) => {
  const getCustomers = await prisma.customer.findMany();
  res.json(getCustomers);
};

const getCustomer = async (req: Request, res: Response) => {
  const getCustomer = await prisma.customer.findFirst({
    where: {
      id: req.params.id,
    },
    select: {
      id: true,
      userId: true,
    },
  });
  res.json(getCustomer);
};

const updateCustomer = async (req: Request, res: Response) => {
  const updateCustomer = await prisma.customer.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json(updateCustomer);
};

const deleteCustomer = async (req: Request, res: Response) => {
  const deleteCustomer = await prisma.customer.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json(deleteCustomer);
};

export {
  createNewCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
