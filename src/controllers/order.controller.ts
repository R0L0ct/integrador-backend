import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../config/prismaClient";

interface RequestExt extends Request {
  user?: string | JwtPayload;
}
const getAllOrders = async (req: RequestExt, res: Response) => {
  try {
    const getOrders = await prisma.order.findMany({
      include: {
        order_product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(getOrders);
  } catch (error) {
    console.log(error);
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const getOrder = await prisma.order.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        order_product: {
          select: {
            inventory: true,
          },
        },
        customer: true,
      },
    });
    return res.json(getOrder);
  } catch (err) {
    console.log(err);
  }
};

const createNewOrder = async (req: Request, res: Response) => {
  try {
    const createOrder = await prisma.order.create({
      data: req.body,
    });
    return res.json(createOrder);
  } catch (err) {
    console.log(err);
  }
};

const addItem = async (req: Request, res: Response) => {
  try {
    const addItem = await prisma.orderProduct.create({
      data: req.body,
    });
    return res.json(addItem);
  } catch (err) {
    console.log(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const updateOrder = await prisma.order.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    return res.json(updateOrder);
  } catch (err) {
    console.log(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleteOrder = await prisma.order.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.json(deleteOrder);
  } catch (err) {
    console.log(err);
  }
};

export {
  getAllOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
  addItem,
};
